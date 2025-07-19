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
        type: DataType.TEXT,
        allowNull: true,
        get() {
            const value = this.getDataValue('image');
            if (!value) return null;

            try {
                // Si es un objeto JSON, parsearlo
                return typeof value === 'string' ? JSON.parse(value) : value;
            } catch {
                // Si no es JSON válido, asumir que es una URL string (compatibilidad)
                return { url: value, public_id: '' };
            }
        },
        set(value: any) {
            if (typeof value === 'object' && value !== null) {
                // Si es un objeto, convertirlo a JSON string
                this.setDataValue('image', JSON.stringify(value));
            } else {
                // Si es string, crear objeto CloudinaryImage
                this.setDataValue('image', JSON.stringify({ url: value, public_id: '' }));
            }
        }
    })
    declare image: { url: string; public_id: string } | null;

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