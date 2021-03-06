import { useEffect, useReducer } from 'react'
import faker from 'faker'

const useDataGenerator = () => {
    let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'GENERATING': {
        return { ...state, generating: true }
      }
      case 'RESOLVED': {
        return {
          ...state,
          generating: false,
          response: action.response
        }
      }
      default:
        return state
    }
  }, {
    generating: false,
    response: null
  })
  
  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "GENERATING" })
    let data = []
    const n = 10
    for (let i = 0; i < n; i++) {
      data.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        avatar: faker.image.avatar(),
        prefix: faker.name.prefix(),
        suffix: faker.name.suffix(),
        jobTitle: faker.name.jobTitle(),
        gender: faker.name.gender(),
        title: faker.name.title(),
        jobDescriptor: faker.name.jobDescriptor(),
        jobArea: faker.name.jobArea(),
        jobType: faker.name.jobType(),
        zipCode: faker.address.zipCode(),
        zipCodeByState: faker.address.zipCodeByState(),
        city: faker.address.city(),
        cityName: faker.address.cityName(),
        streetName: faker.address.streetName(),
        streetAddress: faker.address.streetAddress(),
        county: faker.address.county(),
        country: faker.address.country(),
        countryCode: faker.address.countryCode(),
        state: faker.address.state(),
        stateAbbr: faker.address.stateAbbr(),
        latitude: faker.address.latitude(),
        longitude: faker.address.latitude(),
        direction: faker.address.direction(),
        cardinalDirection: faker.address.cardinalDirection(),
        ordinalDirection: faker.address.ordinalDirection(),
        nearbyGPSCoordinate: faker.address.nearbyGPSCoordinate(),
        timeZone: faker.address.timeZone(),
        pastDate: faker.date.past(),
        futureDate: faker.date.future(),
        betweenDate: faker.date.between(),
        betweensDate: faker.date.betweens(),
        recentDate: faker.date.recent(),
        soonDate: faker.date.soon(),
        month: faker.date.month(),
        weekday: faker.date.weekday(),
        recentTime: faker.time.recent(),
        vehicle: faker.vehicle.vehicle(),
        vehicleModel: faker.vehicle.model(),
        vehicleType: faker.vehicle.type(),
        vehicleFuel: faker.vehicle.fuel(),
        vehicleVin: faker.vehicle.vin(),
        vehicleColor: faker.vehicle.color(),
        bicycle: faker.vehicle.bicycle(),
        slug: faker.lorem.slug(),
        department: faker.commerce.department(),
        productName: faker.commerce.productName(),
        productPrice: faker.commerce.price(),
        productAdjective: faker.commerce.productAdjective(),
        productMaterial: faker.commerce.productMaterial(),
        product: faker.commerce.product(),
        productDescription: faker.commerce.productDescription(),
        companyName: faker.company.companyName(),
        catchPhrase: faker.company.catchPhrase(),
        account: faker.finance.account(),
        accountName: faker.finance.accountName(),
        routingNumber: faker.finance.routingNumber(),
        amount: faker.finance.amount(),
        transactionType: faker.finance.transactionType(),
        currencyCode: faker.finance.currencyCode(),
        currencyName: faker.finance.currencyName(),
        currencySymbol: faker.finance.currencySymbol(),
        bitcoinAddress: faker.finance.bitcoinAddress(),
        litecoinAddress: faker.finance.litecoinAddress(),
        creditCardNumber: faker.finance.creditCardNumber(),
        creditCardCVV: faker.finance.creditCardCVV(),
        ethereumAddress: faker.finance.ethereumAddress(),
        iban: faker.finance.iban(),
        bic: faker.finance.bic(),
        transactionDescription: faker.finance.transactionDescription(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        protocol: faker.internet.protocol(),
        httpMethod: faker.internet.httpMethod(),
        url: faker.internet.url(),
        domainName: faker.internet.domainName(),
        ip: faker.internet.ip(),
        port: faker.internet.port(),
        userAgent: faker.internet.userAgent(),
        phoneNumber: faker.phone.phoneNumber(),
        phoneNumberFormat: faker.phone.phoneNumberFormat(),
        phoneFormats: faker.phone.phoneFormats(),
        fileName: faker.system.fileName(),
        commonFileName: faker.system.commonFileName(),
        commonFileType: faker.system.commonFileType(),
        commonFileExt: faker.system.commonFileExt(),
        fileType: faker.system.fileType(),
        fileExt: faker.system.fileExt(),
        directoryPath: faker.system.directoryPath(),
        filePath: faker.system.filePath(),
        AnimalType: faker.animal.type(),
        dog: faker.animal.dog(),
        cat: faker.animal.cat(),
        snake: faker.animal.snake(),
        lion: faker.animal.lion(),
        horse: faker.animal.horse(),
        bird: faker.animal.bird(),
        cow: faker.animal.cow() 
      })
    }
    dispatch({ type: "RESOLVED", response: data })
    
    return () => {
      isCurrent = false
    }
  }, [])
  
  return [state.generating, state.response]
}

export default useDataGenerator