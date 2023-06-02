import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/modelo/usuario';
import { UsuarioService } from '../../shared/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-usuario-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css']
})
export class ListagemUsuarioTabelaComponent {
  dataSource!: MatTableDataSource<Usuario>;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'ações'];
  roteador: any;

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  apagar(id: number): void {
    console.log(id);
    this.usuarioService.apagar(id).subscribe(
      apagado => {
        const index = this.dataSource.data.findIndex(usuario => usuario.id === id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
        }
      }
    );
  }
}

