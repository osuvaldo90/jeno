import assert from 'assert'

import { add } from '@app/add'

const testAdd = () => {
  assert(add(1, 1) === 2)
}

testAdd()
