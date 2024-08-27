// src/models/url.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

// interface UrlAttributes {
//   id?: number;
//   originalUrl: string;
//   shortUrl: string;
//   createdAt: Date
// }

class Url extends Model {
//   public id!: number;
//   public originalUrl!: string;
//   public shortUrl!: string;
//   public readonly createdAt!: Date;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'original_url'
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'short_url'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at', 
      },
  },
  {
    sequelize,
    tableName: 'urls',
    timestamps: false
  }
);

export default Url;
