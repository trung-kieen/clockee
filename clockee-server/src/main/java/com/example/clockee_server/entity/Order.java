package com.example.clockee_server.entity;

import com.example.clockee_server.util.Client;
import com.example.clockee_server.util.OrderStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
@Client
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Long orderId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "create_at", updatable = false, nullable = false)
  @CreationTimestamp
  private LocalDateTime createAt;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String address;

  @Column(length = 11, nullable = false)
  private String phone;

  @Column(name = "total_price", nullable = false, precision = 10)
  private Double totalPrice;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private OrderStatus status;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<OrderItem> orderItems;
}
