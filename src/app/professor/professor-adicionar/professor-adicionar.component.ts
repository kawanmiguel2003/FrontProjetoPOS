import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-adicionar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './professor-adicionar.component.html',
  styleUrls: ['./professor-adicionar.component.css']
})
export class ProfessorAdicionarComponent {
  constructor(
    private professorService: ProfessorService,
    private router: Router) { }

  professor = {
    nome: '',
    biografia: ''
  }

  adicionar(form: NgForm) {
    if (this.professor.nome.length > 100) {
      form.controls['nome'].setErrors({ maxlength: true });
      return;
    }

    this.professorService.adicionar(this.professor).subscribe({
      next: response => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: 'Professor adicionado com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/professor/listar']);
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: 'Erro ao salvar o professor.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/professor/listar']); // Atualizado para listar professores
  }
}
