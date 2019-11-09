describe("class AutoService", () => {
    let autoService;
    beforeEach(function () {
        autoService = new AutoService(2);
    });
 
    describe("check constructor of class", function () {
        it("shoud inirialize properties correctly", function () {
            //test 1
            expect(autoService.garageCapacity).to.equal(2);
            //test 2
            expect(autoService.workInProgress).to.be.a('array')
            expect(autoService.backlogWork).to.be.a('array');
            expect(autoService.workInProgress.length).to.equal(0);
            expect(autoService.backlogWork.length).to.equal(0);
        });
    })
 
    describe("check accessor availableSpace", function () {
        it("shoud return how more cars can be store in the garage", function () {
            let result = autoService.availableSpace;
            //test 3
            expect(result).to.equal(2);
        });
    })
 
    describe("check function signUpForReview(clientName, plateNumber, carInfo)", function () {
        // test 4
        it("shoud register the current client in workInProgress if thre is space", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            //test 5
            expect(autoService.workInProgress.length).to.equal(1);
            expect(autoService.workInProgress).to.deep.equal([{ plateNumber: 'CA1234CA', clientName: 'Peter', carInfo: { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' } }])
        });
        // test
        it("shoud register the current client in backlogWork if thre is not space", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Valio', 'CA1235CA', { 'engine': 'MFRGG24', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Pesho', 'CA1236CA', { 'engine': 'MFRGG25', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            //test
            expect(autoService.backlogWork.length).to.equal(1);
            expect(autoService.backlogWork).to.deep.equal([{ plateNumber: 'CA1236CA', clientName: 'Pesho', carInfo: { 'engine': 'MFRGG25', 'transmission': 'FF4418ZZ', 'doors': 'broken' } }])
        });
    })
 
    describe("check function carInfo(plateNumber, clienName)", function () {
        // test 8
        it("shoud return Error if clientName or plateNumber did not exist", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            let result = autoService.carInfo('PB9999PB', 'PHILIP');
            //test
            expect(result).to.equal('There is no car with platenumber PB9999PB and owner PHILIP.');
        });
        // test 6, 9
        it("shoud return carInfo if clientName and CarLable exist in workInProgress", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            let result = autoService.carInfo('CA1234CA', 'Peter');
            expect(result).to.deep.equal({ plateNumber: 'CA1234CA', clientName: 'Peter', carInfo: { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' } });
 
        });
        //test 7
        it("shoud return carInfo if clientName and CarLable exist in backlogWork", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Pesho', 'CA1235CA', { 'engine': 'MFRGG24', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Valio', 'CA1236CA', { 'engine': 'MFRGG25', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            let result = autoService.carInfo('CA1236CA', 'Valio');
            expect(result).to.deep.equal({ plateNumber: 'CA1236CA', clientName: 'Valio', carInfo: { 'engine': 'MFRGG25', 'transmission': 'FF4418ZZ', 'doors': 'broken' } });
        });
    })
 
    describe("check function repairCar() (plateNumber, clienName)", function () {
        // test 15
        it("shoud return message if there is not car for reparing", function () {
            let result = autoService.repairCar();
            expect(result).to.equal('No clients, we are just chilling...');
        });
        // test 13, 14
        it("shoud return message if there is not car for reparing", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'broken', 'doors': 'broken' });
            let result = autoService.repairCar();
            expect(result).to.equal(`Your transmission and doors were repaired.`);
            expect(autoService.workInProgress.length).to.equal(0)
        });
        //test
        it("shoud return message if there is not car for reparing", function () {
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': '1234', 'doors': '5665' });
            let result = autoService.repairCar();
            expect(result).to.equal('Your car was fine, nothing was repaired.');
            expect(autoService.workInProgress.length).to.equal(0)
        });
    })
 
});
