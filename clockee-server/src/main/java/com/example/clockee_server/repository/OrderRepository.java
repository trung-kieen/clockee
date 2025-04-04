package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT YEAR(o.createAt) as year, MONTH(o.createAt) as month, " +
            "SUM((p.sellPrice - p.actualPrice) * oi.quantity) as revenue " +
            "FROM Order o " +
            "JOIN o.orderItems oi " +
            "JOIN oi.product p " +
            "WHERE o.status = 'COMPLETED' " +
            "GROUP BY YEAR(o.createAt), MONTH(o.createAt) " +
            "ORDER BY YEAR(o.createAt), MONTH(o.createAt)")
    List<Object[]> getMonthlyRevenue();

    @Query("SELECT SUM((p.sellPrice - p.actualPrice) * oi.quantity) as revenue " +
            "FROM Order o " +
            "JOIN o.orderItems oi " +
            "JOIN oi.product p " +
            "WHERE o.status = 'COMPLETED' " +
            "AND YEAR(o.createAt) = :year " +
            "AND MONTH(o.createAt) = :month")
    Optional<Double> getRevenueByMonthAndYear(@Param("year") int year, @Param("month") int month);
}
