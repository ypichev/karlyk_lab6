package dao;

import model.User;
import java.sql.*;
import java.util.*;

public class UserDAO {
    private Connection conn;

    public UserDAO(Connection conn) {
        this.conn = conn;
    }

    public void insert(User user) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.setString(1, user.getName());
        stmt.setString(2, user.getEmail());
        stmt.executeUpdate();
    }

    public List<User> findByName(String name) throws SQLException {
        List<User> users = new ArrayList<>();
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
        stmt.setString(1, name);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            users.add(new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email")
            ));
        }
        return users;
    }
}

