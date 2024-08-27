import { Sequelize } from 'sequelize';

const urlshortener = 'urlshortener'

const sequelize = new Sequelize(urlshortener, urlshortener, urlshortener, {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;