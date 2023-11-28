import {useCaseFactory} from "./useCase.js";
import {fakeAdapter} from "../adapters/fakeAdapter.js";
import {computation} from "./computation.js";


describe("useCaseTest", () => {

    it("should compute the result", async () => {
        const useCase = useCaseFactory(fakeAdapter, computation);
        const result = await useCase(2)
        expect(result).toEqual({result: 22})
    })

})