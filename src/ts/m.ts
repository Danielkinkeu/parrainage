// interface Student {
//     id: string;
//     name: string;
//     photo: string;
// }

// interface Assignment {
//     m1Student: Student;
//     m2Students: Student[];
// }

// class ParrainageSystemX {
//     private m1Students: Student[] = [];
//     private m2Students: Student[] = [];
//     private availableM2Students: Student[] = [];
//     private assignments: Assignment[] = [];
//     private currentIndex: number = 0;
//     private usedM2Indices: Set<number> = new Set();

//     constructor() {
//         this.loadStudents();
//         this.setupEventListeners();
//     }

//     private loadStudents(): void {
//         // Étudiants Master 1
//         this.m1Students = [
//             { id: 'm1_1', name: 'Alice 1', photo: '../master1/1.jpeg' },
//             { id: 'm1_2', name: 'Bruno 2', photo: '../master1/2.jpeg' },
//             { id: 'm1_3', name: 'Clara 3', photo: '../master1/3.jpeg' },
//             { id: 'm1_4', name: 'David 4', photo: '../master1/4.jpeg' },
//             { id: 'm1_5', name: 'Émilie 5', photo: '../master1/5.jpeg' },
//             { id: 'm1_6', name: 'Alice 6', photo: '../master1/6.jpeg' },
//             { id: 'm1_7', name: 'Bruno 7', photo: '../master1/7.jpeg' },
//             { id: 'm1_8', name: 'Clara 8', photo: '../master1/8.jpeg' },
//             { id: 'm1_9', name: 'David 9', photo: '../master1/9.jpeg' },
//             { id: 'm1_10', name: 'Émilie 10', photo: '../master1/10.jpeg' }
//         ];

//         // Étudiants Master 2 (parrains)
//         this.m2Students = [
//             { id: 'm2_1', name: 'Sophie 1', photo: '../master2/a01.jpeg' },
//             { id: 'm2_2', name: 'Thomas 2', photo: '../master2/a02.jpeg' },
//             { id: 'm2_3', name: 'Nicolas 3', photo: '../master2/a03.jpeg' },
//             { id: 'm2_4', name: 'Laura 4', photo: '../master2/a04.jpeg' },
//             { id: 'm2_5', name: 'Marc 5', photo: '../master2/a05.jpeg' },
//             { id: 'm2_6', name: 'Julie 6', photo: '../master2/a06.jpeg' }
//         ];

//         this.availableM2Students = [...this.m2Students];
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
//         this.usedM2Indices.clear();
//         this.availableM2Students = [...this.m2Students];
        
//         const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
//         const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
        
//         startBtn.disabled = true;
//         nextBtn.disabled = false;
        
//         this.showCurrentStudent();
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

//         // Calculer combien de parrains attribuer
//         const remainingM1 = this.m1Students.length - this.currentIndex;
//         const parrainsPerStudent = Math.ceil(this.availableM2Students.length / remainingM1);
//         const assignedM2 = this.availableM2Students.splice(0, parrainsPerStudent);

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

//     private displayCurrentAssignment(assignment: Assignment): void {
//         const m1Photo = document.getElementById('m1-photo') as HTMLDivElement;
//         const m1Name = document.getElementById('m1-name') as HTMLParagraphElement;
//         const m2Photo = document.getElementById('m2-photo') as HTMLDivElement;
//         const m2Name = document.getElementById('m2-name') as HTMLParagraphElement;
//         const m2Count = document.getElementById('m2-count') as HTMLParagraphElement;

//         // Afficher l'étudiant M1
//         m1Name.textContent = assignment.m1Student.name;
//         this.displayPhoto(m1Photo, assignment.m1Student.photo, '👨‍🎓');

//         // Afficher le(s) parrain(s) M2
//         if (assignment.m2Students.length === 1) {
//             m2Name.textContent = assignment.m2Students[0].name;
//             m2Count.textContent = '';
//             this.displayPhoto(m2Photo, assignment.m2Students[0].photo, '👩‍🎓');
//         } else {
//             m2Name.textContent = `${assignment.m2Students.length} parrains attribués`;
//             m2Count.textContent = assignment.m2Students.map(m2 => m2.name).join(', ');
//             m2Photo.innerHTML = '<div class="multiple-avatars">👥</div>';
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

//         let html = `
//             <div class="stats">
//                 <p><strong>${this.m1Students.length}</strong> étudiants M1</p>
//                 <p><strong>${this.m2Students.length}</strong> parrains M2</p>
//             </div>
//             <div class="assignments-grid">
//         `;
        
//         this.assignments.forEach(assignment => {
//             html += `
//                 <div class="assignment-item">
//                     <div class="m1-info">
//                         <div class="photo-container">
//                             ${this.getPhotoHTML(assignment.m1Student.photo, '👨‍🎓')}
//                         </div>
//                         <div class="student-details">
//                             <h4>${assignment.m1Student.name}</h4>
//                             <span class="badge">Filleul M1</span>
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

//     private getPhotoHTML(photoUrl: string, defaultAvatar: string): string {
//         return `
//             <img src="${photoUrl}" alt="Photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
//             <div class="avatar" style="display: none;">${defaultAvatar}</div>
//         `;
//     }

//     private generatePrintableDocument(): void {
//         const printWindow = window.open('', '_blank');
//         if (!printWindow) return;

//         const printContent = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Récapitulatif Parrainage M1/M2</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
//                     .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
//                     .stats { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; }
//                     .stat-item { text-align: center; }
//                     .assignment { margin-bottom: 25px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
//                     .m1-student { font-weight: bold; font-size: 16px; color: #2c5aa0; margin-bottom: 10px; }
//                     .parrains { margin-left: 20px; }
//                     .m2-student { display: flex; align-items: center; margin: 5px 0; }
//                     .photo { width: 50px; height: 50px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
//                     h1 { color: #2c3e50; }
//                     @media print {
//                         .assignment { break-inside: avoid; }
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="header">
//                     <h1>🎓 Récapitulatif du Parrainage M1/M2</h1>
//                     <div class="stats">
//                         <div class="stat-item">
//                             <strong>Étudiants M1:</strong> ${this.m1Students.length}
//                         </div>
//                         <div class="stat-item">
//                             <strong>Parrains M2:</strong> ${this.m2Students.length}
//                         </div>
//                     </div>
//                 </div>
                
//                 ${this.assignments.map(assignment => `
//                     <div class="assignment">
//                         <div class="m1-student">
//                             👨‍🎓 ${assignment.m1Student.name}
//                         </div>
//                         <div class="parrains">
//                             <strong>Parrain(s):</strong>
//                             ${assignment.m2Students.map(m2 => `
//                                 <div class="m2-student">
//                                     <div class="photo">👩‍🎓</div>
//                                     <div>${m2.name}</div>
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
// }

// // Initialiser l'application quand la page est chargée
// document.addEventListener('DOMContentLoaded', () => {
//     new ParrainageSystem();
// });