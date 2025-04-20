package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    @Query("SELECT SUM(p.totalPrice)"
            + "FROM Purchase p WHERE YEAR(p.createAt) = :year "
            + "AND MONTH(p.createAt) = :month")
    Double totalPricePurchase(@Param("year") int year, @Param("month") int month);

}
