import test from 'ava'
import fetch from 'node-fetch'


test(async t => {
    const result = await fetch('http://localhost:3000')

    result.ok ? t.pass() : t.fail()
    result.status === 200 ? t.pass() : t.fail()
    await result.text() === 'hello' ? t.pass() : t.fail()
})
