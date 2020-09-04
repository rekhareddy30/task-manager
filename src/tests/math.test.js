const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../math')

test('Should calcuate total tip', ()=>{
    const total = calculateTip(10, .3)
   expect(total).toBe(13)
   
})

test('should calculate total with defualt tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5) 
})

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

/*test('Async Demo', (done)=>{
    setTimeout(() => {
        expect(1).toBe(2)
        done()
    }, 2000)
  })
*/
test('Should add 2 numbers', (done) => {
    add(2, 3).then( (sum)  => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add 2 numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
    

})