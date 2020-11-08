import { castBoolean, castNumber } from './typeCasting';

describe('castBoolean', () => {
  it.each`
    val        | result
    ${1}       | ${true}
    ${'1'}     | ${true}
    ${'TRUE'}  | ${true}
    ${'true'}  | ${true}
    ${0}       | ${false}
    ${'0'}     | ${false}
    ${'FALSE'} | ${false}
    ${'false'} | ${false}
  `('returns $result for $val', ({ val, result }) => {
    expect(castBoolean(val)).toEqual(result);
  });

  it.each`
    val
    ${2}
    ${'3'}
    ${'blah'}
    ${{}}
    ${[]}
    ${jest.fn()}
    ${class {}}
  `('throws on $val', ({ val }) => {
    expect(() => castBoolean(val)).toThrow();
  });
});

describe('castNumber', () => {
  it.each`
    val      | isInt    | result
    ${'1'}   | ${true}  | ${1}
    ${'1.3'} | ${true}  | ${1}
    ${'1.5'} | ${true}  | ${2}
    ${'2'}   | ${false} | ${2}
    ${'1.5'} | ${false} | ${1.5}
  `('returns $result for $val', ({ val, isInt, result }) => {
    expect(castNumber(val, isInt)).toEqual(result);
  });

  it.each`
    val
    ${'blah'}
    ${{}}
    ${[]}
    ${jest.fn()}
    ${class {}}
  `('throws on $val', ({ val }) => {
    expect(() => castNumber(val, false)).toThrow();
  });
});
