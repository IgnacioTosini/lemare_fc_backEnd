import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import SocialMedia from "./SocialMedia.model";
import Stats from "./Stats.model";

@Table({
    tableName: "players",
    timestamps: true
})
class Player extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare image: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare number: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare year: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare age: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare country: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true
    })
    declare height: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare position: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare description: string;

    @ForeignKey(() => Stats)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare statsId: number;

    @HasMany(() => SocialMedia)
    socialMedia?: SocialMedia[];

    @BelongsTo(() => Stats)
    stats!: Stats;
}

export default Player;