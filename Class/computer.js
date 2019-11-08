class Computer {
    //test 1
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = Number(ramMemory);
        this.cpuGHz = Number(cpuGHz);
        this.hddMemory = Number(hddMemory);
        this.taskManager = [];
        this.installedPrograms = [];
    }
    //test 2,3,4,5
    installAProgram(name, requiredSpace) {

        if (this.hddMemory < requiredSpace) {
            throw new Error('There is not enough space on the hard drive');
        }

        let program = {
            name,
            requiredSpace
        }

        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;

        return program;
    }
    //test 6,7,8
    uninstallAProgram(name) {
        let index = this.installedPrograms.findIndex(progr => progr.name === name);

        if (index === -1) {
            throw new Error('Control panel is not responding')
        }

        this.hddMemory += this.installedPrograms[index].requiredSpace;
        this.installedPrograms.splice(index, 1);

        return this.installedPrograms;
    }
    // test 9, 10, 11, 12, 13
    openAProgram(name) {
        let indexinInstalledPrograms = this.installedPrograms.findIndex(progr => progr.name === name);
        let indexInOpenedPrograms = this.taskManager.findIndex(progr => progr.name === name);

        if (indexinInstalledPrograms === -1) {
            throw new Error(`The ${name} is not recognized`)
        }

        if (indexInOpenedPrograms !== -1) {
            throw new Error(`The ${name} is already open`)
        }

        let ramUsage = (this.installedPrograms[indexinInstalledPrograms].requiredSpace / this.ramMemory) * 1.5;
        let cpuUsage = ((this.installedPrograms[indexinInstalledPrograms].requiredSpace / this.cpuGHz) / 500) * 1.5;

        let currentProgram = {
            name,
            ramUsage,
            cpuUsage,
        }

        let usedRamMemory = this.taskManager.reduce((a, b) => (a + b.ramUsage), 0);
        let usedCPU = this.taskManager.reduce((a, b) => (a + b.cpuUsage), 0);

        if (ramUsage + usedRamMemory >= 100) {
            throw new Error(`${name} caused out of memory exception}`)
        }

        if (cpuUsage + usedCPU >= 100) {
            throw new Error(`${name} caused out of cpu exception}`)
        }
        this.taskManager.push(currentProgram);

        return currentProgram;
    }

    taskManagerView() {
        //test 14
        if (this.taskManager.length === 0) {
            return 'All running smooth so far'
        }
        //test15
        return this.taskManager.map(progr => `Name - ${progr.name} | Usage - CPU: ${progr.cpuUsage.toFixed(0)}%, RAM: ${progr.ramUsage.toFixed(0)}%`).join('\n')
    }
}

let computer = new Computer(4096, 7.5, 250000);

computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Word');
computer.openAProgram('Excel');
computer.openAProgram('PowerPoint');
computer.openAProgram('Solitare');

console.log(computer.taskManagerView());
