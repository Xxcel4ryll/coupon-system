module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
        unique: true,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cart_minumum_amount: {
        type: Sequelize.STRING,
        allowNull: false
      },

      discount_type: {
        type: Sequelize.ENUM,
        values: ['FIXED', 'PERCENT', 'MIXED'],
        allowNull: false,
      },
  
      discount_amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      cart_length: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },

      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: true,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('coupons');
  },
};
