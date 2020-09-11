import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { TableroService } from '../../service/tablero.service';
import { Tablero } from '../../models/tablero';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-top-usuario-mas-gastan',
  templateUrl: './top-usuario-mas-gastan.component.html',
  styleUrls: ['./top-usuario-mas-gastan.component.css']
})
export class TopUsuarioMasGastanComponent implements OnInit {

  totalArray: number[] = new Array();
  labels: string[] = new Array();
  tableros: Tablero[];
  chartReady: boolean = false;
  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartLegend = false;
  public chartType = 'pie';
  public chartPlugins = [pluginDataLabels];
  public chartColors: Color[] = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)'],
    },
  ]
  public chartOptions: ChartOptions;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private tableroService: TableroService) { }

  ngOnInit(): void {
    this.tableroService.getUsuariosConMasGastos().subscribe(tableros => {
      if (tableros) {
        this.tableros = tableros;
        this.tableros.forEach(tablero => {
          this.labels.push(tablero.nombre);
          this.totalArray.push(tablero.total);
        })

        this.chartData = [
          { data: this.totalArray }
        ]
        this.setChartOptions()
        this.chartLabels = this.labels;
        this.chartReady = true;
      }
    })
  }

  setChartOptions() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        }
      },

    }
  }
}
