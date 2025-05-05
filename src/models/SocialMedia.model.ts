import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import Player from "./Player.model";

@Table({
    tableName: "social_media",
    timestamps: true
})
class SocialMedia extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare typeOfSocialMedia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare url: string;

    @ForeignKey(() => Player)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare playerId: number;
}

export default SocialMedia;