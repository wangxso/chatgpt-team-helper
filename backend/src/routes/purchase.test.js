import test from 'node:test'
import assert from 'node:assert/strict'
import initSqlJs from 'sql.js'
import { getTodayAvailableCodeCount, reserveTodayCode } from './purchase.js'

const createDatabase = async () => {
  const SQL = await initSqlJs()
  const db = new SQL.Database()

  db.run(`
    CREATE TABLE gpt_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      is_open INTEGER DEFAULT 0,
      user_count INTEGER DEFAULT 0,
      created_at DATETIME,
      updated_at DATETIME
    )
  `)

  db.run(`
    CREATE TABLE redemption_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      account_email TEXT,
      channel TEXT,
      is_redeemed INTEGER DEFAULT 0,
      created_at DATETIME,
      updated_at DATETIME,
      reserved_for_uid TEXT,
      reserved_for_username TEXT,
      reserved_for_entry_id INTEGER,
      reserved_at DATETIME,
      reserved_for_order_no TEXT,
      reserved_for_order_email TEXT
    )
  `)

  return db
}

test('展示库存有货时，下单预留应命中同一批今日兑换码', async () => {
  const db = await createDatabase()

  db.run(`
    INSERT INTO gpt_accounts (email, is_open, user_count, created_at, updated_at)
    VALUES ('legacy@example.com', 1, 1, DATETIME('now', 'localtime', '-1 day'), DATETIME('now', 'localtime'))
  `)

  db.run(`
    INSERT INTO redemption_codes (
      code, account_email, channel, is_redeemed, created_at, updated_at,
      reserved_for_uid, reserved_for_entry_id, reserved_for_order_no
    ) VALUES (
      'CODE-TODAY-001', 'legacy@example.com', 'common', 0, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'),
      NULL, 0, NULL
    )
  `)

  assert.equal(getTodayAvailableCodeCount(db, { channel: 'common' }), 1)

  const reserved = reserveTodayCode(db, {
    orderNo: 'PO-001',
    email: 'buyer@example.com',
    channel: 'common'
  })

  assert.ok(reserved)
  assert.equal(reserved.code, 'CODE-TODAY-001')
  assert.equal(reserved.accountEmail, 'legacy@example.com')

  const reservedOrderNo = db.exec(`SELECT reserved_for_order_no FROM redemption_codes WHERE code = 'CODE-TODAY-001'`)[0]?.values?.[0]?.[0]
  assert.equal(reservedOrderNo, 'PO-001')
})

test('展示库存已计入的关闭账号兑换码，下单预留也应命中', async () => {
  const db = await createDatabase()

  db.run(`
    INSERT INTO gpt_accounts (email, is_open, user_count, created_at, updated_at)
    VALUES ('closed@example.com', 0, 5, DATETIME('now', 'localtime', '-3 day'), DATETIME('now', 'localtime'))
  `)

  db.run(`
    INSERT INTO redemption_codes (
      code, account_email, channel, is_redeemed, created_at, updated_at,
      reserved_for_uid, reserved_for_entry_id, reserved_for_order_no
    ) VALUES (
      'CODE-CLOSED-001', 'closed@example.com', 'common', 0, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'),
      NULL, 0, NULL
    )
  `)

  assert.equal(getTodayAvailableCodeCount(db, { channel: 'common' }), 1)

  const reserved = reserveTodayCode(db, {
    orderNo: 'PO-002',
    email: 'buyer@example.com',
    channel: 'common'
  })

  assert.ok(reserved)
  assert.equal(reserved.code, 'CODE-CLOSED-001')
})

test('并发场景下如果兑换码已被抢先占用，预留应返回 null', async () => {
  const db = await createDatabase()

  db.run(`
    INSERT INTO redemption_codes (
      code, account_email, channel, is_redeemed, created_at, updated_at,
      reserved_for_uid, reserved_for_entry_id, reserved_for_order_no
    ) VALUES (
      'CODE-RACE-001', 'race@example.com', 'common', 0, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'),
      NULL, 0, NULL
    )
  `)

  let hijacked = false
  const racingDb = {
    exec: (...args) => db.exec(...args),
    run: (...args) => {
      if (!hijacked) {
        hijacked = true
        db.run("UPDATE redemption_codes SET reserved_for_order_no = 'OTHER-ORDER' WHERE code = 'CODE-RACE-001'")
      }
      return db.run(...args)
    },
    getRowsModified: () => db.getRowsModified()
  }

  assert.equal(reserveTodayCode(racingDb, {
    orderNo: 'PO-003',
    email: 'buyer@example.com',
    channel: 'common'
  }), null)

  const reservedOrderNo = db.exec("SELECT reserved_for_order_no FROM redemption_codes WHERE code = 'CODE-RACE-001'")[0]?.values?.[0]?.[0]
  assert.equal(reservedOrderNo, 'OTHER-ORDER')
})

test('非今日生成的兑换码不应被展示库存和预留逻辑选中', async () => {
  const db = await createDatabase()

  db.run(`
    INSERT INTO redemption_codes (
      code, account_email, channel, is_redeemed, created_at, updated_at,
      reserved_for_uid, reserved_for_entry_id, reserved_for_order_no
    ) VALUES (
      'CODE-OLD-001', 'old@example.com', 'common', 0, DATETIME('now', 'localtime', '-1 day'), DATETIME('now', 'localtime'),
      NULL, 0, NULL
    )
  `)

  assert.equal(getTodayAvailableCodeCount(db, { channel: 'common' }), 0)
  assert.equal(reserveTodayCode(db, {
    orderNo: 'PO-004',
    email: 'buyer@example.com',
    channel: 'common'
  }), null)
})
