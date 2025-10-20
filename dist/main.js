"use strict";
class ParrainageSystem {
    constructor() {
        this.m1Students = [];
        this.m2Students = [];
        this.assignments = [];
        this.currentIndex = 0;
        this.availableM2Students = new Map();
        this.usedM2Students = new Set();
        this.loadStudents();
        this.setupEventListeners();
    }
    loadStudents() {
        this.m1Students = [
            { id: 'm1_1', name: 'Alice Martin', photo: '../master1/alice.jpg', speciality: 'DS' },
            { id: 'm1_2', name: 'Bruno Dubois', photo: '../master1/bruno.jpg', speciality: 'SSI' },
            { id: 'm1_3', name: 'Clara Petit', photo: '../master1/clara.jpg', speciality: 'DS' },
            { id: 'm1_4', name: 'David Moreau', photo: '../master1/david.jpg', speciality: 'SSI' },
            { id: 'm1_5', name: 'Émilie Laurent', photo: '../master1/emilie.jpg', speciality: 'DS' },
            { id: 'm1_6', name: 'François Garnier', photo: '../master1/francois.jpg', speciality: 'SSI' }
        ];
        this.m2Students = [
            { id: 'm2_1', name: 'Sophie Bernard', photo: '../master2/sophie.jpg', speciality: 'SSI' },
            { id: 'm2_2', name: 'Thomas Roux', photo: '../master2/thomas.jpg', speciality: 'SSI' },
            { id: 'm2_3', name: 'Nicolas Leroy', photo: '../master2/nicolas.jpg', speciality: 'SSI' },
            { id: 'm2_4', name: 'Laura Simon', photo: '../master2/laura.jpg', speciality: 'SSI' },
            { id: 'm2_5', name: 'Marc Fournier', photo: '../master2/marc.jpg', speciality: 'DS' },
            { id: 'm2_6', name: 'Julie Lefebvre', photo: '../master2/julie.jpg', speciality: 'SSI' }
        ];
    }
    setupEventListeners() {
        const startBtn = document.getElementById('startBtn');
        const nextBtn = document.getElementById('nextBtn');
        const generateBtn = document.getElementById('generateBtn');
        startBtn.addEventListener('click', () => this.startAssignment());
        nextBtn.addEventListener('click', () => this.nextStudent());
        generateBtn.addEventListener('click', () => this.generateSummary());
    }
    startAssignment() {
        this.assignments = [];
        this.currentIndex = 0;
        this.usedM2Students.clear();
        this.shuffleArray(this.m1Students);
        this.shuffleArray(this.m2Students);
        this.organizeM2BySpeciality();
        const startBtn = document.getElementById('startBtn');
        const nextBtn = document.getElementById('nextBtn');
        startBtn.disabled = true;
        nextBtn.disabled = false;
        this.showCurrentStudent();
    }
    organizeM2BySpeciality() {
        this.availableM2Students = new Map();
        this.m2Students.forEach(m2 => {
            if (!this.availableM2Students.has(m2.speciality)) {
                this.availableM2Students.set(m2.speciality, []);
            }
            this.availableM2Students.get(m2.speciality).push(m2);
        });
    }
    nextStudent() {
        if (this.currentIndex >= this.m1Students.length) {
            this.ensureAllM2Assigned();
            this.finishAssignments();
            return;
        }
        this.currentIndex++;
        if (this.currentIndex >= this.m1Students.length) {
            this.ensureAllM2Assigned();
            this.finishAssignments();
        }
        else {
            this.showCurrentStudent();
        }
    }
    ensureAllM2Assigned() {
        const allM2Ids = new Set(this.m2Students.map(m2 => m2.id));
        const unusedM2Ids = new Set([...allM2Ids].filter(id => !this.usedM2Students.has(id)));
        if (unusedM2Ids.size > 0) {
            unusedM2Ids.forEach(m2Id => {
                const unusedM2 = this.m2Students.find(m2 => m2.id === m2Id);
                const m1SameSpeciality = this.m1Students.filter(m1 => m1.speciality === unusedM2.speciality);
                if (m1SameSpeciality.length > 0) {
                    const randomM1Index = Math.floor(Math.random() * m1SameSpeciality.length);
                    const randomM1 = m1SameSpeciality[randomM1Index];
                    const assignmentIndex = this.assignments.findIndex(a => a.m1Student.id === randomM1.id);
                    if (assignmentIndex !== -1) {
                        this.assignments[assignmentIndex].m2Students.push(unusedM2);
                        this.usedM2Students.add(unusedM2.id);
                    }
                }
            });
        }
    }
    showCurrentStudent() {
        const currentM1 = this.m1Students[this.currentIndex];
        const assignmentDiv = document.getElementById('current-assignment');
        const studentCount = document.getElementById('current-student-count');
        const assignedM2 = this.selectParrainsWithGuarantee(currentM1);
        const assignment = {
            m1Student: currentM1,
            m2Students: assignedM2
        };
        this.assignments.push(assignment);
        studentCount.textContent = `${this.currentIndex + 1}/${this.m1Students.length}`;
        assignmentDiv.style.display = 'block';
        this.displayCurrentAssignment(assignment);
    }
    selectParrainsWithGuarantee(currentM1) {
        const assignedParrains = [];
        const speciality = currentM1.speciality;
        const availableM2 = this.availableM2Students.get(speciality) || [];
        if (availableM2.length > 0) {
            const parrain = availableM2.shift();
            assignedParrains.push(parrain);
            this.usedM2Students.add(parrain.id);
        }
        else {
            const allM2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality);
            if (allM2InSpeciality.length > 0) {
                const randomIndex = Math.floor(Math.random() * allM2InSpeciality.length);
                const randomParrain = allM2InSpeciality[randomIndex];
                assignedParrains.push(randomParrain);
                this.usedM2Students.add(randomParrain.id);
            }
        }
        const additionalParrains = this.calculateAdditionalParrains(currentM1, assignedParrains.length);
        for (let i = 0; i < additionalParrains; i++) {
            if (availableM2.length > 0) {
                const additionalParrain = availableM2.shift();
                assignedParrains.push(additionalParrain);
                this.usedM2Students.add(additionalParrain.id);
            }
            else {
                const allM2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality);
                if (allM2InSpeciality.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allM2InSpeciality.length);
                    const randomParrain = allM2InSpeciality[randomIndex];
                    assignedParrains.push(randomParrain);
                    this.usedM2Students.add(randomParrain.id);
                }
            }
        }
        this.availableM2Students.set(speciality, availableM2);
        return assignedParrains;
    }
    calculateAdditionalParrains(currentM1, currentCount) {
        const speciality = currentM1.speciality;
        const m1InSpeciality = this.m1Students.filter(m1 => m1.speciality === speciality).length;
        const m2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality).length;
        const treatedM1InSpeciality = this.assignments.filter(a => a.m1Student.speciality === speciality).length + 1;
        if (m2InSpeciality > m1InSpeciality) {
            const extraParrains = m2InSpeciality - m1InSpeciality;
            return treatedM1InSpeciality <= extraParrains ? 1 : 0;
        }
        return 0;
    }
    displayCurrentAssignment(assignment) {
        const m1Photo = document.getElementById('m1-photo');
        const m1Name = document.getElementById('m1-name');
        const m2Photo = document.getElementById('m2-photo');
        const m2Name = document.getElementById('m2-name');
        const m2Count = document.getElementById('m2-count');
        m1Name.textContent = `${assignment.m1Student.name} (${assignment.m1Student.speciality})`;
        this.displayPhoto(m1Photo, assignment.m1Student.photo, '👨‍🎓');
        if (assignment.m2Students.length === 1) {
            m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
            m2Count.textContent = '';
            this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
        }
        else {
            m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
            m2Count.textContent = `+ ${assignment.m2Students.length - 1} autre(s) parrain(s)`;
            this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
        }
    }
    displayPhoto(container, photoUrl, defaultAvatar) {
        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'Photo étudiant';
        img.onerror = () => {
            container.innerHTML = `<div class="avatar">${defaultAvatar}</div>`;
        };
        img.onload = () => {
            container.appendChild(img);
        };
        img.src = photoUrl;
    }
    finishAssignments() {
        const assignmentDiv = document.getElementById('current-assignment');
        const nextBtn = document.getElementById('nextBtn');
        const generateBtn = document.getElementById('generateBtn');
        assignmentDiv.style.display = 'none';
        nextBtn.disabled = true;
        generateBtn.disabled = false;
        alert('Toutes les attributions sont terminées ! Cliquez sur "Générer le récapitulatif"');
    }
    generateSummary() {
        const summaryDiv = document.getElementById('summary');
        const summaryContent = document.getElementById('summary-content');
        const stats = this.calculateStatistics();
        let html = `
            <div class="stats">
                <p><strong>${this.m1Students.length}</strong> étudiants M1</p>
                <p><strong>${this.m2Students.length}</strong> parrains M2</p>
                <p><strong>${stats.totalAssignments}</strong> attributions totales</p>
                <p><strong>M1 avec parrains:</strong> ${stats.m1WithParrains}</p>
                <p><strong>M2 utilisés:</strong> ${stats.m2Used}</p>
                <p><strong>DS:</strong> ${stats.ds.m1} M1 / ${stats.ds.m2} M2</p>
                <p><strong>SSI:</strong> ${stats.ssi.m1} M1 / ${stats.ssi.m2} M2</p>
            </div>
            <div class="assignments-grid">
        `;
        this.assignments.forEach((assignment, index) => {
            html += `
                <div class="assignment-item">
                    <div class="assignment-header">
                        <span class="assignment-number">Étudiant ${index + 1}</span>
                        <span class="speciality-badge ${assignment.m1Student.speciality.toLowerCase()}">${assignment.m1Student.speciality}</span>
                        <span class="parrain-count-badge">${assignment.m2Students.length} parrain(s)</span>
                    </div>
                    <div class="m1-info">
                        <div class="photo-container">
                            ${this.getPhotoHTML(assignment.m1Student.photo, '👨‍🎓')}
                        </div>
                        <div class="student-details">
                            <h4>${assignment.m1Student.name}</h4>
                            <span class="badge">Filleul M1</span>
                            <span class="speciality-tag ${assignment.m1Student.speciality.toLowerCase()}">${assignment.m1Student.speciality}</span>
                        </div>
                    </div>
                    <div class="parrains-list">
                        <h5>Parrain(s) M2 attribué(s):</h5>
                        ${assignment.m2Students.map(m2 => `
                            <div class="m2-item">
                                <div class="photo-container">
                                    ${this.getPhotoHTML(m2.photo, '👩‍🎓')}
                                </div>
                                <div class="student-details">
                                    <span>${m2.name}</span>
                                    <span class="badge m2-badge">Parrain</span>
                                    <span class="speciality-tag ${m2.speciality.toLowerCase()}">${m2.speciality}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        html += '</div>';
        summaryContent.innerHTML = html;
        summaryDiv.style.display = 'block';
        setTimeout(() => this.generatePrintableDocument(), 500);
    }
    calculateStatistics() {
        let totalAssignments = 0;
        const m1WithParrains = this.assignments.filter(a => a.m2Students.length > 0).length;
        const m2Used = this.usedM2Students.size;
        const dsM1 = this.m1Students.filter(m1 => m1.speciality === 'DS').length;
        const ssiM1 = this.m1Students.filter(m1 => m1.speciality === 'SSI').length;
        const dsM2 = this.m2Students.filter(m2 => m2.speciality === 'DS').length;
        const ssiM2 = this.m2Students.filter(m2 => m2.speciality === 'SSI').length;
        this.assignments.forEach(assignment => {
            totalAssignments += assignment.m2Students.length;
        });
        return {
            totalAssignments,
            m1WithParrains,
            m2Used,
            ds: { m1: dsM1, m2: dsM2 },
            ssi: { m1: ssiM1, m2: ssiM2 }
        };
    }
    getPhotoHTML(photoUrl, defaultAvatar) {
        return `
            <img src="${photoUrl}" alt="Photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="avatar" style="display: none;">${defaultAvatar}</div>
        `;
    }
    generatePrintableDocument() {
        const printWindow = window.open('', '_blank');
        if (!printWindow)
            return;
        const stats = this.calculateStatistics();
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Récapitulatif Parrainage M1/M2</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                    .stats { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
                    .stat-item { text-align: center; background: #f5f5f5; padding: 6px 10px; border-radius: 6px; font-size: 11px; }
                    .speciality-stats { display: flex; justify-content: center; gap: 15px; margin: 10px 0; }
                    .speciality-item { background: #e8f4fd; padding: 8px; border-radius: 6px; font-size: 12px; }
                    .assignment { margin-bottom: 15px; padding: 12px; border: 1px solid #ddd; border-radius: 6px; background: #fafafa; }
                    .m1-student { font-weight: bold; font-size: 14px; color: #2c5aa0; margin-bottom: 6px; }
                    .parrains { margin-left: 12px; }
                    .m2-student { display: flex; align-items: center; margin: 4px 0; padding: 2px; font-size: 12px; }
                    .speciality-indicator { padding: 1px 4px; border-radius: 8px; font-size: 10px; margin-left: 5px; color: white; }
                    .ds-speciality { background: #4CAF50; }
                    .ssi-speciality { background: #FF9800; }
                    h1 { color: #2c3e50; font-size: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🎓 Récapitulatif Parrainage M1/M2</h1>
                    <div class="stats">
                        <div class="stat-item"><strong>M1:</strong> ${stats.m1WithParrains}/${this.m1Students.length} avec parrains</div>
                        <div class="stat-item"><strong>M2:</strong> ${stats.m2Used}/${this.m2Students.length} utilisés</div>
                        <div class="stat-item"><strong>Attributions:</strong> ${stats.totalAssignments}</div>
                    </div>
                    <div class="speciality-stats">
                        <div class="speciality-item"><strong>DS:</strong> ${stats.ds.m1} M1 / ${stats.ds.m2} M2</div>
                        <div class="speciality-item"><strong>SSI:</strong> ${stats.ssi.m1} M1 / ${stats.ssi.m2} M2</div>
                    </div>
                </div>
                
                ${this.assignments.map((assignment, index) => `
                    <div class="assignment">
                        <div class="m1-student">
                            👨‍🎓 ${assignment.m1Student.name}
                            <span class="speciality-indicator ${assignment.m1Student.speciality.toLowerCase()}-speciality">${assignment.m1Student.speciality}</span>
                            <small>(${assignment.m2Students.length} parrain(s))</small>
                        </div>
                        <div class="parrains">
                            ${assignment.m2Students.map(m2 => `
                                <div class="m2-student">
                                    👩‍🎓 ${m2.name}
                                    <span class="speciality-indicator ${m2.speciality.toLowerCase()}-speciality">${m2.speciality}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </body>
            </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
        };
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ParrainageSystem();
});
//# sourceMappingURL=main.js.map