import { Component, OnInit, ViewChild } from '@angular/core';
import { TableroService } from '../../service/tablero.service';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { Tablero } from '../../models/tablero';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-top-productos-vendidos',
  templateUrl: './top-productos-vendidos.component.html',
  styleUrls: ['./top-productos-vendidos.component.css']
})
export class TopProductosVendidosComponent implements OnInit {
  valorMax: number;
  valorMin: number;

  tableros: Tablero[];
  fechaDesde = new Date();
  fechaHasta = new Date();
  cantidadArray: number[] = new Array();
  labels: string[] = new Array();
  chartReady: boolean = false;

  public chartData: ChartDataSets[] = new Array();
  public chartLabels: Label[] = new Array();
  public chartLegend = false;
  public chartType = 'bar';
  public chartPlugins = [pluginDataLabels];
  public chartColors: Color[] = [
    { //Color de barra anaranjado
      backgroundColor: '#ffa040',
      borderColor: '#ff8000',
      pointHoverBackgroundColor: '#fff',
    },
  ]
  public chartOptions: ChartOptions;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private tableroService: TableroService) { }

  ngOnInit(): void {
    this.onChangeFechas(this.fechaDesde, this.fechaHasta);
  }

  onChangeFechas(fechaDesde: Date, fechaHasta: Date) {
    this.valorMax = this.valorMin = 0;
    let desde = fechaDesde.toLocaleDateString('en-US');
    let hasta = fechaHasta.toLocaleDateString('en-US');
    this.labels = [];
    this.cantidadArray = [];
    this.tableroService.getProductosMasVendidosEntreFechas(desde, hasta).subscribe(tableros => {
      if (tableros) {
        this.tableros = tableros;
        this.tableros.forEach(tablero => {
          this.labels.push(tablero.nombre);
          this.cantidadArray.push(tablero.cantidad)
        })

        this.cantidadArray.forEach(cantidad => {
          if (cantidad <= this.valorMax){
            this.valorMin = cantidad;
          }else {
            this.valorMax = cantidad;
          }
        })
        this.chartData = [
          { data: this.cantidadArray }
        ];

        console.log(this.valorMax)
        
        console.log(this.valorMin)
        this.setChartOptions()
        this.chartLabels = this.labels;
        this.chartReady = true;
      }
    })
  }

  formatearFechas(e: any): string {
    var a: string = '';
    if (e instanceof Date) {
       e = e.toLocaleDateString('en-US');
    }
    a = e;
    return a;
  }

  setChartOptions() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },
      scales: {
        xAxes: [{}], yAxes: [{
          ticks: {
            max: Math.round(this.valorMax) + 3,
            min: Math.round(this.valorMin) - 3
          }
        }]
      }
    }
  }
}
