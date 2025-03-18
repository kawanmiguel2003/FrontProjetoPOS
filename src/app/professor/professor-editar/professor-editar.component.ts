import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service'; // Atualizado para ProfessorService
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-editar', // Alterado o seletor para professor
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './professor-editar.component.html', // Atualizado o template HTML
  styleUrls: ['./professor-editar.component.css'] // Atualizado se necessário
})
export class ProfessorEditarComponent implements OnInit {
  constructor(
    private professorService: ProfessorService, // Alterado para ProfessorService
    private route: ActivatedRoute,
    private router: Router) { }

  professor: any = {
    id: '',
    nome: '',
    biografia: '' // Alterado para biografia
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da URL
    if (id) {
      this.obterProfessor(id);
    }
  }

  obterProfessor(id: any) {
    this.professorService.obter(id).subscribe({
      next: response => {
        this.professor = response.dados; // Ajuste de acordo com a estrutura da resposta
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: 'Erro ao obter o professor.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  atualizar(form: NgForm) {
    if (this.professor.nome.length > 100) { // Ajuste de validação do nome
      form.controls['nome'].setErrors({ maxlength: true });
      return;
    }

    this.professorService.atualizar(this.professor).subscribe({
      next: response => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: response.dados.mensagem, // Resposta de sucesso
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/professor/listar']); // Navegação após sucesso
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: 'Erro ao atualizar o professor.', // Mensagem de erro
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/professor/listar']); // Navegação para listar professores
  }
}
