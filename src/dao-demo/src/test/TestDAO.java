package test;

import dao.UserDAO;
import model.User;
import java.sql.*;
import java.util.List;

public class TestDAO {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/test_db";
        String user = "root";
        String password = "Mclaren#345";

        try {
            Connection conn = DriverManager.getConnection(url, user, password);
            UserDAO userDAO = new UserDAO(conn);

            // Додавання користувачів
            userDAO.insert(new User(0, "Oleh", "oleh@example.com"));
            userDAO.insert(new User(0, "Anna", "anna@example.com"));

            // Пошук
            List<User> list = userDAO.findByName("Oleh");
            for (User u : list) {
                System.out.println("Found: " + u.getName() + " — " + u.getEmail());
            }

            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

