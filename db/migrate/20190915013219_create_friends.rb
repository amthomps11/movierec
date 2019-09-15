class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.integer :user1id
      t.integer :user2id
      t.boolean :confirmed

      t.timestamps
    end
  end
end
