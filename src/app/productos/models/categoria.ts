export class Categoria {
    id: number;
    nombre: string;

    
    public static readonly categoriaToIdCategoria = new Map([
        ['Whisky', 1],
        ['Ron', 2],
        ['Cerveza', 3],
        ['Vino', 4],
        ['Vodka', 5],
        ['Tequila', 6],
        ['Piqueos', 7],
        ['Otros', 8],
    ]);
}
