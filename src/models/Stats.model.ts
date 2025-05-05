import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import Player from "./Player.model";

@Table({
    tableName: "stats",
    timestamps: true
})
class Stats extends Model {
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
    declare goals: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare assists: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare matches: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare yellowCards: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare redCards: number;

    @ForeignKey(() => Player)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare playerId: number;

    @BelongsTo(() => Player)
    player!: Player;
}

export default Stats;