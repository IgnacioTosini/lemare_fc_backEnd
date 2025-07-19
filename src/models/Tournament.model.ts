import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "matches",
    timestamps: true
})
export class Match extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare homeTeam: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare awayTeam: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare homeScore?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare awayScore?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare location: string;
}

@Table({
    tableName: "tournament_table",
    timestamps: true
})
export class TournamentTableEntry extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare position: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare teamName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare matchesPlayed: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare goalsFor: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare goalsAgainst: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare goalDifference: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare points: number;
}
