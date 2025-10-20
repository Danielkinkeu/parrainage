// interface Student {
//     id: string;
//     name: string;
//     photo: string;
//     speciality: string;
// }

// interface Assignment {
//     m1Student: Student;
//     m2Students: Student[];
// }

// class ParrainageSystem {
//     private m1Students: Student[] = [];
//     private m2Students: Student[] = [];
//     private assignments: Assignment[] = [];
//     private currentIndex: number = 0;
//     private availableM2Students: Map<string, Student[]> = new Map();

//     constructor() {
//         this.loadStudents();
//         this.setupEventListeners();
//     }

//     private loadStudents(): void {
//         // Étudiants Master 1
//         this.m1Students = [
//             { id: 'm1_1', name: 'Alice Martin', photo: '../master1/alice.jpg', speciality: 'DS' },
//             { id: 'm1_2', name: 'Bruno Dubois', photo: '../master1/bruno.jpg', speciality: 'SSI' },
//             { id: 'm1_3', name: 'Clara Petit', photo: '../master1/clara.jpg', speciality: 'DS' },
//             { id: 'm1_4', name: 'David Moreau', photo: '../master1/david.jpg', speciality: 'SSI' },
//             { id: 'm1_5', name: 'Émilie Laurent', photo: '../master1/emilie.jpg', speciality: 'DS' },
//             { id: 'm1_6', name: 'François Garnier', photo: '../master1/francois.jpg', speciality: 'SSI' }
//         ];

//         // Étudiants Master 2 (parrains)
//         this.m2Students = [
//             { id: 'm2_1', name: 'Sophie Bernard', photo: '../master2/sophie.jpg', speciality: 'SSI' },
//             { id: 'm2_2', name: 'Thomas Roux', photo: '../master2/thomas.jpg', speciality: 'SSI' },
//             { id: 'm2_3', name: 'Nicolas Leroy', photo: '../master2/nicolas.jpg', speciality: 'SSI' },
//             { id: 'm2_4', name: 'Laura Simon', photo: '../master2/laura.jpg', speciality: 'SSI' },
//             { id: 'm2_5', name: 'Marc Fournier', photo: '../master2/marc.jpg', speciality: 'SSI' },
//             { id: 'm2_6', name: 'Julie Lefebvre', photo: '../master2/julie.jpg', speciality: 'SSI' },
//             { id: 'm2_7', name: 'Pierre Morel', photo: '../master2/pierre.jpg', speciality: 'DS' }
//         ];
//     }

//     private setupEventListeners(): void {
//         const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
//         const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
//         const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;

//         startBtn.addEventListener('click', () => this.startAssignment());
//         nextBtn.addEventListener('click', () => this.nextStudent());
//         generateBtn.addEventListener('click', () => this.generateSummary());
//     }

//     private startAssignment(): void {
//         this.assignments = [];
//         this.currentIndex = 0;
        
//         // Mélanger aléatoirement les listes
//         this.shuffleArray(this.m1Students);
//         this.shuffleArray(this.m2Students);
        
//         // Organiser les M2 par spécialité
//         this.organizeM2BySpeciality();
        
//         const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
//         const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
        
//         startBtn.disabled = true;
//         nextBtn.disabled = false;
        
//         this.showCurrentStudent();
//     }

//     private organizeM2BySpeciality(): void {
//         this.availableM2Students = new Map();
        
//         // Grouper les M2 par spécialité
//         this.m2Students.forEach(m2 => {
//             if (!this.availableM2Students.has(m2.speciality)) {
//                 this.availableM2Students.set(m2.speciality, []);
//             }
//             this.availableM2Students.get(m2.speciality)!.push(m2);
//         });
//     }

//     private nextStudent(): void {
//         if (this.currentIndex >= this.m1Students.length) {
//             this.finishAssignments();
//             return;
//         }

//         this.currentIndex++;
        
//         if (this.currentIndex >= this.m1Students.length) {
//             this.finishAssignments();
//         } else {
//             this.showCurrentStudent();
//         }
//     }

//     private showCurrentStudent(): void {
//         const currentM1 = this.m1Students[this.currentIndex];
//         const assignmentDiv = document.getElementById('current-assignment') as HTMLDivElement;
//         const studentCount = document.getElementById('current-student-count') as HTMLSpanElement;

//         // Sélectionner les parrains de la même spécialité
//         const assignedM2 = this.selectParrainsBySpeciality(currentM1.speciality);

//         // Créer l'assignment
//         const assignment: Assignment = {
//             m1Student: currentM1,
//             m2Students: assignedM2
//         };
//         this.assignments.push(assignment);

//         // Afficher l'attribution en cours
//         studentCount.textContent = `${this.currentIndex + 1}/${this.m1Students.length}`;
//         assignmentDiv.style.display = 'block';
//         this.displayCurrentAssignment(assignment);
//     }

//     private selectParrainsBySpeciality(speciality: string): Student[] {
//         const assignedParrains: Student[] = [];
//         const availableM2 = this.availableM2Students.get(speciality) || [];
        
//         // Calculer combien de parrains attribuer pour cette spécialité
//         const m1InSpeciality = this.m1Students.filter(m1 => m1.speciality === speciality).length;
//         const m2InSpeciality = availableM2.length;
        
//         const parrainsPerStudent = this.calculateParrainsPerStudentForSpeciality(m1InSpeciality, m2InSpeciality);

//         for (let i = 0; i < parrainsPerStudent; i++) {
//             if (availableM2.length > 0) {
//                 // Prendre un parrain disponible de la même spécialité
//                 assignedParrains.push(availableM2.shift()!);
//             } else {
//                 // Si plus de parrains disponibles dans cette spécialité, 
//                 // choisir aléatoirement parmi tous les M2 de cette spécialité
//                 const allM2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality);
//                 if (allM2InSpeciality.length > 0) {
//                     const randomIndex = Math.floor(Math.random() * allM2InSpeciality.length);
//                     assignedParrains.push(allM2InSpeciality[randomIndex]);
//                 }
//             }
//         }

//         // Mettre à jour la liste disponible
//         this.availableM2Students.set(speciality, availableM2);

//         return assignedParrains;
//     }

//     private calculateParrainsPerStudentForSpeciality(m1Count: number, m2Count: number): number {
//         // Même logique mais appliquée par spécialité
//         return m1Count <= m2Count ? 
//             (this.getCurrentM1IndexInSpeciality() < (m2Count % m1Count) ? 2 : 1) : 1;
//     }

//     private getCurrentM1IndexInSpeciality(): number {
//         const currentSpeciality = this.m1Students[this.currentIndex].speciality;
//         const m1InSameSpeciality = this.m1Students.slice(0, this.currentIndex + 1)
//             .filter(m1 => m1.speciality === currentSpeciality);
//         return m1InSameSpeciality.length - 1;
//     }

//     private displayCurrentAssignment(assignment: Assignment): void {
//         const m1Photo = document.getElementById('m1-photo') as HTMLDivElement;
//         const m1Name = document.getElementById('m1-name') as HTMLParagraphElement;
//         const m2Photo = document.getElementById('m2-photo') as HTMLDivElement;
//         const m2Name = document.getElementById('m2-name') as HTMLParagraphElement;
//         const m2Count = document.getElementById('m2-count') as HTMLParagraphElement;

//         // Afficher l'étudiant M1
//         m1Name.textContent = `${assignment.m1Student.name} (${assignment.m1Student.speciality})`;
//         this.displayPhoto(m1Photo, assignment.m1Student.photo, '👨‍🎓');

//         // Afficher le(s) parrain(s) M2
//         if (assignment.m2Students.length === 1) {
//             m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
//             m2Count.textContent = '';
//             this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
//         } else {
//             // Pour plusieurs parrains, afficher le premier avec indication du nombre total
//             m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
//             m2Count.textContent = `+ ${assignment.m2Students.length - 1} autre(s) parrain(s) ${assignment.m1Student.speciality}`;
//             this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
//         }
//     }

//     private displayPhoto(container: HTMLDivElement, photoUrl: string, defaultAvatar: string): void {
//         container.innerHTML = '';
        
//         const img = document.createElement('img');
//         img.src = photoUrl;
//         img.alt = 'Photo étudiant';
//         img.onerror = () => {
//             container.innerHTML = `<div class="avatar">${defaultAvatar}</div>`;
//         };
//         img.onload = () => {
//             container.appendChild(img);
//         };
        
//         // Charger l'image
//         img.src = photoUrl;
//     }

//     private finishAssignments(): void {
//         const assignmentDiv = document.getElementById('current-assignment') as HTMLDivElement;
//         const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
//         const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;

//         assignmentDiv.style.display = 'none';
//         nextBtn.disabled = true;
//         generateBtn.disabled = false;
        
//         alert('Toutes les attributions sont terminées ! Cliquez sur "Générer le récapitulatif"');
//     }

//     private generateSummary(): void {
//         const summaryDiv = document.getElementById('summary') as HTMLDivElement;
//         const summaryContent = document.getElementById('summary-content') as HTMLDivElement;

//         // Compter les statistiques par spécialité
//         const stats = this.calculateStatistics();

//         let html = `
//             <div class="stats">
//                 <p><strong>${this.m1Students.length}</strong> étudiants M1</p>
//                 <p><strong>${this.m2Students.length}</strong> parrains M2</p>
//                 <p><strong>${stats.totalAssignments}</strong> attributions totales</p>
//                 <p><strong>DS:</strong> ${stats.ds.m1} M1 / ${stats.ds.m2} M2</p>
//                 <p><strong>SSI:</strong> ${stats.ssi.m1} M1 / ${stats.ssi.m2} M2</p>
//             </div>
//             <div class="assignments-grid">
//         `;
        
//         this.assignments.forEach((assignment, index) => {
//             html += `
//                 <div class="assignment-item">
//                     <div class="assignment-header">
//                         <span class="assignment-number">Étudiant ${index + 1}</span>
//                         <span class="speciality-badge ${assignment.m1Student.speciality.toLowerCase()}">${assignment.m1Student.speciality}</span>
//                         <span class="parrain-count-badge">${assignment.m2Students.length} parrain(s)</span>
//                     </div>
//                     <div class="m1-info">
//                         <div class="photo-container">
//                             ${this.getPhotoHTML(assignment.m1Student.photo, '👨‍🎓')}
//                         </div>
//                         <div class="student-details">
//                             <h4>${assignment.m1Student.name}</h4>
//                             <span class="badge">Filleul M1</span>
//                             <span class="speciality-tag ${assignment.m1Student.speciality.toLowerCase()}">${assignment.m1Student.speciality}</span>
//                         </div>
//                     </div>
//                     <div class="parrains-list">
//                         <h5>Parrain(s) M2 attribué(s):</h5>
//                         ${assignment.m2Students.map(m2 => `
//                             <div class="m2-item">
//                                 <div class="photo-container">
//                                     ${this.getPhotoHTML(m2.photo, '👩‍🎓')}
//                                 </div>
//                                 <div class="student-details">
//                                     <span>${m2.name}</span>
//                                     <span class="badge m2-badge">Parrain</span>
//                                     <span class="speciality-tag ${m2.speciality.toLowerCase()}">${m2.speciality}</span>
//                                 </div>
//                             </div>
//                         `).join('')}
//                     </div>
//                 </div>
//             `;
//         });

//         html += '</div>';
//         summaryContent.innerHTML = html;
//         summaryDiv.style.display = 'block';

//         // Générer le PDF imprimable
//         setTimeout(() => this.generatePrintableDocument(), 500);
//     }

//     private calculateStatistics(): { 
//         totalAssignments: number; 
//         ds: { m1: number; m2: number };
//         ssi: { m1: number; m2: number };
//     } {
//         let totalAssignments = 0;
//         const dsM1 = this.m1Students.filter(m1 => m1.speciality === 'DS').length;
//         const ssiM1 = this.m1Students.filter(m1 => m1.speciality === 'SSI').length;
//         const dsM2 = this.m2Students.filter(m2 => m2.speciality === 'DS').length;
//         const ssiM2 = this.m2Students.filter(m2 => m2.speciality === 'SSI').length;

//         this.assignments.forEach(assignment => {
//             totalAssignments += assignment.m2Students.length;
//         });

//         return { 
//             totalAssignments, 
//             ds: { m1: dsM1, m2: dsM2 },
//             ssi: { m1: ssiM1, m2: ssiM2 }
//         };
//     }

//     private getPhotoHTML(photoUrl: string, defaultAvatar: string): string {
//         return `
//             <img src="${photoUrl}" alt="Photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
//             <div class="avatar" style="display: none;">${defaultAvatar}</div>
//         `;
//     }

//     private generatePrintableDocument(): void {
//         const printWindow = window.open('', '_blank');
//         if (!printWindow) return;

//         const stats = this.calculateStatistics();

//         const printContent = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Récapitulatif Parrainage M1/M2</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
//                     .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
//                     .stats { display: flex; justify-content: center; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; }
//                     .stat-item { text-align: center; background: #f5f5f5; padding: 8px 12px; border-radius: 6px; font-size: 12px; }
//                     .speciality-stats { display: flex; justify-content: center; gap: 20px; margin: 15px 0; }
//                     .speciality-item { background: #e8f4fd; padding: 10px; border-radius: 6px; }
//                     .assignment { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa; page-break-inside: avoid; }
//                     .m1-student { font-weight: bold; font-size: 16px; color: #2c5aa0; margin-bottom: 8px; display: flex; align-items: center; }
//                     .parrains { margin-left: 15px; }
//                     .m2-student { display: flex; align-items: center; margin: 5px 0; padding: 3px; font-size: 14px; }
//                     .photo { width: 30px; height: 30px; border: 1px solid #ccc; border-radius: 4px; margin-right: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
//                     h1 { color: #2c3e50; font-size: 24px; }
//                     .assignment-number { background: #4CAF50; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px; }
//                     .speciality-indicator { background: #2196F3; color: white; padding: 2px 6px; border-radius: 10px; font-size: 11px; margin-left: 5px; }
//                     .ds-speciality { background: #4CAF50; }
//                     .ssi-speciality { background: #FF9800; }
//                 </style>
//             </head>
//             <body>
//                 <div class="header">
//                     <h1>🎓 Récapitulatif du Parrainage M1/M2</h1>
//                     <div class="stats">
//                         <div class="stat-item"><strong>Étudiants M1:</strong> ${this.m1Students.length}</div>
//                         <div class="stat-item"><strong>Parrains M2:</strong> ${this.m2Students.length}</div>
//                         <div class="stat-item"><strong>Attributions:</strong> ${stats.totalAssignments}</div>
//                     </div>
//                     <div class="speciality-stats">
//                         <div class="speciality-item">
//                             <strong>DS:</strong> ${stats.ds.m1} M1 / ${stats.ds.m2} M2
//                         </div>
//                         <div class="speciality-item">
//                             <strong>SSI:</strong> ${stats.ssi.m1} M1 / ${stats.ssi.m2} M2
//                         </div>
//                     </div>
//                 </div>
                
//                 ${this.assignments.map((assignment, index) => `
//                     <div class="assignment">
//                         <div class="m1-student">
//                             👨‍🎓 ${assignment.m1Student.name}
//                             <span class="assignment-number">${index + 1}</span>
//                             <span class="speciality-indicator ${assignment.m1Student.speciality.toLowerCase()}-speciality">${assignment.m1Student.speciality}</span>
//                         </div>
//                         <div class="parrains">
//                             <strong>Parrain(s) M2 (${assignment.m2Students.length}):</strong>
//                             ${assignment.m2Students.map(m2 => `
//                                 <div class="m2-student">
//                                     <div class="photo">👩‍🎓</div>
//                                     <div>${m2.name}</div>
//                                     <span class="speciality-indicator ${m2.speciality.toLowerCase()}-speciality" style="margin-left: 8px;">${m2.speciality}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     </div>
//                 `).join('')}
//             </body>
//             </html>
//         `;

//         printWindow.document.write(printContent);
//         printWindow.document.close();
        
//         printWindow.onload = () => {
//             printWindow.print();
//         };
//     }

//     private shuffleArray(array: any[]): void {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     }
// }

// // Initialiser l'application quand la page est chargée
// document.addEventListener('DOMContentLoaded', () => {
//     new ParrainageSystem();
// });






























interface Student {
    id: string;
    name: string;
    photo: string;
    speciality: string;
}

interface Assignment {
    m1Student: Student;
    m2Students: Student[];
}

class ParrainageSystem {
    private m1Students: Student[] = [];
    private m2Students: Student[] = [];
    private assignments: Assignment[] = [];
    private currentIndex: number = 0;
    private availableM2Students: Map<string, Student[]> = new Map();
    private usedM2Students: Set<string> = new Set();

    constructor() {
        this.loadStudents();
        this.setupEventListeners();
    }

    private loadStudents(): void {
        // Étudiants Master 1
        this.m1Students = [
            { id: 'm1_1', name: 'Alice Martin', photo: '../master1/alice.jpg', speciality: 'DS' },
            { id: 'm1_2', name: 'Bruno Dubois', photo: '../master1/bruno.jpg', speciality: 'SSI' },
            { id: 'm1_3', name: 'Clara Petit', photo: '../master1/clara.jpg', speciality: 'DS' },
            { id: 'm1_4', name: 'David Moreau', photo: '../master1/david.jpg', speciality: 'SSI' },
            { id: 'm1_5', name: 'Émilie Laurent', photo: '../master1/emilie.jpg', speciality: 'DS' },
            { id: 'm1_6', name: 'François Garnier', photo: '../master1/francois.jpg', speciality: 'SSI' }
        ];

        // Étudiants Master 2 (parrains)
        this.m2Students = [
            { id: 'm2_1', name: 'Sophie Bernard', photo: '../master2/sophie.jpg', speciality: 'SSI' },
            { id: 'm2_2', name: 'Thomas Roux', photo: '../master2/thomas.jpg', speciality: 'SSI' },
            { id: 'm2_3', name: 'Nicolas Leroy', photo: '../master2/nicolas.jpg', speciality: 'SSI' },
            { id: 'm2_4', name: 'Laura Simon', photo: '../master2/laura.jpg', speciality: 'SSI' },
            { id: 'm2_5', name: 'Marc Fournier', photo: '../master2/marc.jpg', speciality: 'DS' },
            { id: 'm2_6', name: 'Julie Lefebvre', photo: '../master2/julie.jpg', speciality: 'SSI' }
        ];
    }

    private setupEventListeners(): void {
        const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
        const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
        const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;

        startBtn.addEventListener('click', () => this.startAssignment());
        nextBtn.addEventListener('click', () => this.nextStudent());
        generateBtn.addEventListener('click', () => this.generateSummary());
    }

    private startAssignment(): void {
        this.assignments = [];
        this.currentIndex = 0;
        this.usedM2Students.clear();
        
        // Mélanger aléatoirement les listes
        this.shuffleArray(this.m1Students);
        this.shuffleArray(this.m2Students);
        
        // Organiser les M2 par spécialité
        this.organizeM2BySpeciality();
        
        const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
        const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
        
        startBtn.disabled = true;
        nextBtn.disabled = false;
        
        this.showCurrentStudent();
    }

    private organizeM2BySpeciality(): void {
        this.availableM2Students = new Map();
        
        // Grouper les M2 par spécialité
        this.m2Students.forEach(m2 => {
            if (!this.availableM2Students.has(m2.speciality)) {
                this.availableM2Students.set(m2.speciality, []);
            }
            this.availableM2Students.get(m2.speciality)!.push(m2);
        });
    }

    private nextStudent(): void {
        if (this.currentIndex >= this.m1Students.length) {
            // Vérifier que tous les M2 ont été utilisés au moins une fois
            this.ensureAllM2Assigned();
            this.finishAssignments();
            return;
        }

        this.currentIndex++;
        
        if (this.currentIndex >= this.m1Students.length) {
            this.ensureAllM2Assigned();
            this.finishAssignments();
        } else {
            this.showCurrentStudent();
        }
    }

    private ensureAllM2Assigned(): void {
        // Vérifier s'il reste des M2 non utilisés
        const allM2Ids = new Set(this.m2Students.map(m2 => m2.id));
        const unusedM2Ids = new Set([...allM2Ids].filter(id => !this.usedM2Students.has(id)));

        if (unusedM2Ids.size > 0) {
            // Attribuer les M2 non utilisés à des M1 aléatoires de la même spécialité
            unusedM2Ids.forEach(m2Id => {
                const unusedM2 = this.m2Students.find(m2 => m2.id === m2Id)!;
                const m1SameSpeciality = this.m1Students.filter(m1 => m1.speciality === unusedM2.speciality);
                
                if (m1SameSpeciality.length > 0) {
                    // Choisir un M1 aléatoire de la même spécialité
                    const randomM1Index = Math.floor(Math.random() * m1SameSpeciality.length);
                    const randomM1 = m1SameSpeciality[randomM1Index];
                    
                    // Trouver l'assignment correspondant à ce M1
                    const assignmentIndex = this.assignments.findIndex(a => a.m1Student.id === randomM1.id);
                    if (assignmentIndex !== -1) {
                        // Ajouter le M2 non utilisé à cet assignment
                        this.assignments[assignmentIndex].m2Students.push(unusedM2);
                        this.usedM2Students.add(unusedM2.id);
                    }
                }
            });
        }
    }

    private showCurrentStudent(): void {
        const currentM1 = this.m1Students[this.currentIndex];
        const assignmentDiv = document.getElementById('current-assignment') as HTMLDivElement;
        const studentCount = document.getElementById('current-student-count') as HTMLSpanElement;

        // Garantir que chaque M1 a au moins 1 parrain
        const assignedM2 = this.selectParrainsWithGuarantee(currentM1);

        // Créer l'assignment
        const assignment: Assignment = {
            m1Student: currentM1,
            m2Students: assignedM2
        };
        this.assignments.push(assignment);

        // Afficher l'attribution en cours
        studentCount.textContent = `${this.currentIndex + 1}/${this.m1Students.length}`;
        assignmentDiv.style.display = 'block';
        this.displayCurrentAssignment(assignment);
    }

    private selectParrainsWithGuarantee(currentM1: Student): Student[] {
        const assignedParrains: Student[] = [];
        const speciality = currentM1.speciality;
        const availableM2 = this.availableM2Students.get(speciality) || [];
        
        // Étape 1: Garantir au moins 1 parrain pour chaque M1
        if (availableM2.length > 0) {
            // Prendre un parrain disponible
            const parrain = availableM2.shift()!;
            assignedParrains.push(parrain);
            this.usedM2Students.add(parrain.id);
        } else {
            // Si aucun parrain disponible, en choisir un au hasard parmi tous les M2 de cette spécialité
            const allM2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality);
            if (allM2InSpeciality.length > 0) {
                const randomIndex = Math.floor(Math.random() * allM2InSpeciality.length);
                const randomParrain = allM2InSpeciality[randomIndex];
                assignedParrains.push(randomParrain);
                this.usedM2Students.add(randomParrain.id);
            }
        }

        // Étape 2: Ajouter des parrains supplémentaires si possible (logique équilibrée)
        const additionalParrains = this.calculateAdditionalParrains(currentM1, assignedParrains.length);
        for (let i = 0; i < additionalParrains; i++) {
            if (availableM2.length > 0) {
                const additionalParrain = availableM2.shift()!;
                assignedParrains.push(additionalParrain);
                this.usedM2Students.add(additionalParrain.id);
            } else {
                // Choisir aléatoirement parmi tous les M2 de la spécialité
                const allM2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality);
                if (allM2InSpeciality.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allM2InSpeciality.length);
                    const randomParrain = allM2InSpeciality[randomIndex];
                    assignedParrains.push(randomParrain);
                    this.usedM2Students.add(randomParrain.id);
                }
            }
        }

        // Mettre à jour la liste disponible
        this.availableM2Students.set(speciality, availableM2);

        return assignedParrains;
    }

    private calculateAdditionalParrains(currentM1: Student, currentCount: number): number {
        const speciality = currentM1.speciality;
        const m1InSpeciality = this.m1Students.filter(m1 => m1.speciality === speciality).length;
        const m2InSpeciality = this.m2Students.filter(m2 => m2.speciality === speciality).length;
        
        // Calculer combien de M1 ont déjà été traités dans cette spécialité
        const treatedM1InSpeciality = this.assignments.filter(a => 
            a.m1Student.speciality === speciality
        ).length + 1; // +1 pour l'étudiant actuel

        // Si plus de M2 que de M1, certains M1 auront des parrains supplémentaires
        if (m2InSpeciality > m1InSpeciality) {
            const extraParrains = m2InSpeciality - m1InSpeciality;
            // Distribuer les parrains supplémentaires parmi les premiers M1
            return treatedM1InSpeciality <= extraParrains ? 1 : 0;
        }
        
        return 0;
    }

    private displayCurrentAssignment(assignment: Assignment): void {
        const m1Photo = document.getElementById('m1-photo') as HTMLDivElement;
        const m1Name = document.getElementById('m1-name') as HTMLParagraphElement;
        const m2Photo = document.getElementById('m2-photo') as HTMLDivElement;
        const m2Name = document.getElementById('m2-name') as HTMLParagraphElement;
        const m2Count = document.getElementById('m2-count') as HTMLParagraphElement;

        // Afficher l'étudiant M1
        m1Name.textContent = `${assignment.m1Student.name} (${assignment.m1Student.speciality})`;
        this.displayPhoto(m1Photo, assignment.m1Student.photo, '👨‍🎓');

        // Afficher le(s) parrain(s) M2
        if (assignment.m2Students.length === 1) {
            m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
            m2Count.textContent = '';
            this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
        } else {
            m2Name.textContent = `${assignment.m2Students[0].name} (${assignment.m2Students[0].speciality})`;
            m2Count.textContent = `+ ${assignment.m2Students.length - 1} autre(s) parrain(s)`;
            this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
        }
    }

    private displayPhoto(container: HTMLDivElement, photoUrl: string, defaultAvatar: string): void {
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

    private finishAssignments(): void {
        const assignmentDiv = document.getElementById('current-assignment') as HTMLDivElement;
        const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
        const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;

        assignmentDiv.style.display = 'none';
        nextBtn.disabled = true;
        generateBtn.disabled = false;
        
        alert('Toutes les attributions sont terminées ! Cliquez sur "Générer le récapitulatif"');
    }

    private generateSummary(): void {
        const summaryDiv = document.getElementById('summary') as HTMLDivElement;
        const summaryContent = document.getElementById('summary-content') as HTMLDivElement;

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

    private calculateStatistics(): { 
        totalAssignments: number;
        m1WithParrains: number;
        m2Used: number;
        ds: { m1: number; m2: number };
        ssi: { m1: number; m2: number };
    } {
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

    private getPhotoHTML(photoUrl: string, defaultAvatar: string): string {
        return `
            <img src="${photoUrl}" alt="Photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="avatar" style="display: none;">${defaultAvatar}</div>
        `;
    }

    private generatePrintableDocument(): void {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

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

    private shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Initialiser l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new ParrainageSystem();
});