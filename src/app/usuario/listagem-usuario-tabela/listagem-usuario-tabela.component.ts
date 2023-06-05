import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/modelo/usuario';
import { UsuarioService } from '../../shared/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-usuario-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css']
})
export class ListagemUsuarioTabelaComponent {
  dataSource: MatTableDataSource<Usuario>;

  displayedColumns = ['nome', 'cpf', 'idade', 'acoes'];

  constructor(private usuarioService: UsuarioService,private roteador: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }
  
  editar(id: number): void {
    console.log(id)
    this.roteador.navigate(['editausuario', id])
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
