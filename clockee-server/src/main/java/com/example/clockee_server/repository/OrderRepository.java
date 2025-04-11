package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query(
      "SELECT YEAR(o.createAt) as year, MONTH(o.createAt) as month, "
          + "SUM((p.sellPrice - p.actualPrice) * oi.quantity) as revenue "
          + "FROM Order o "
          + "JOIN o.orderItems oi "
          + "JOIN oi.product p "
          + "WHERE o.status = 'SHIPPED' "
          + "GROUP BY YEAR(o.createAt), MONTH(o.createAt) "
          + "ORDER BY YEAR(o.createAt), MONTH(o.createAt)")
  List<Object[]> getMonthlyRevenue();

  @Query(
      "SELECT COALESCE(SUM((COALESCE(p.sellPrice, 0) - COALESCE(p.actualPrice, 0)) * COALESCE(oi.quantity, 0)), 0) as revenue "
          + "FROM Order o "
          + "JOIN o.orderItems oi "
          + "JOIN oi.product p "
          + "WHERE o.status = 'SHIPPED' "
          + "AND YEAR(o.createAt) = :year "
          + "AND MONTH(o.createAt) = :month")
  Optional<Double> getRevenueByMonthAndYear(@Param("year") int year, @Param("month") int month);
}
