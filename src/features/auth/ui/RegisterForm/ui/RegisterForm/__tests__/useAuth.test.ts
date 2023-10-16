import { create } from 'zustand'

export const useStore = create(set => ({
    foo: 0
}))

test('repro', () => {
    console.log(useStore.getState())
})
