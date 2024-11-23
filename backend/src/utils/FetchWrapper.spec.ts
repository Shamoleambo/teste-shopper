import { FetchWrapper } from "./FetchWrapper"

describe('FetchWrapper', () => {

    test('should make sure that fetch is called with correct params', async () => {
        const sut = new FetchWrapper()

        const originAddress = 'any_origin_address'
        const destinationAddress = 'any_destination_address'

        const fetchFromRoutesApiSpy = jest.spyOn(sut, 'fetchFromRoutesApi')
        sut.fetchFromRoutesApi(originAddress, destinationAddress)

        expect(fetchFromRoutesApiSpy).toHaveBeenCalledWith(originAddress, destinationAddress)
        expect(fetchFromRoutesApiSpy).toHaveBeenCalledTimes(1)
    })
})