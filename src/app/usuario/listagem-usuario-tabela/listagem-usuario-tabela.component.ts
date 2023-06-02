import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/modelo/usuario';
import { UsuarioService } from '../../shared/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-usuario-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css']
})
export class ListagemUsuarioTabelaComponent implements OnInit {
  usuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario>;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'ações'];

  constructor(private usuarioService: UsuarioService) {
    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.dataSource.data = this.usuarios;
      }
    );
  }

  apagar(id: number): void {
    this.usuarioService.apagar(id).subscribe(
      apagado => {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index > -1) {
          this.usuarios.splice(index, 1);
          this.dataSource.data = this.usuarios;
        }
      }
    );
  }
}
