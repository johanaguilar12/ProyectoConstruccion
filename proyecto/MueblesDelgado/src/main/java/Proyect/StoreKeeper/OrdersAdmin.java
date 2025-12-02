package Proyect.StoreKeeper;

import Proyect.Inventory.Furniture;
import Proyect.Repositories.OrderRepository;
import Proyect.Validations.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrdersAdmin {

    private final OrderRepository orderRepository;

    @Autowired
    public OrdersAdmin(OrderRepository p_orderRepository) {
        this.orderRepository = p_orderRepository;
    }

    public Order findByOrderId(int p_orderId) {
        return orderRepository.findById(p_orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: ID " + p_orderId));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order addOrder(Order p_order) {
        ValidationUtils.validateNonNull(p_order, "Order");

        // Vinculación manual obligatoria antes de guardar
        if (p_order.getOrderContent() != null) {
            for (Furniture f : p_order.getOrderContent()) {
                f.setOrder(p_order);
            }
            p_order.calculateAssemblyTime();
        }

        return orderRepository.save(p_order);
    }

    public void setOrders(List<Order> p_orders) {
        for(Order order : p_orders) {
            if (order.getOrderContent() != null) {
                for (Furniture f : order.getOrderContent()) {
                    f.setOrder(order);
                }
            }
        }
        orderRepository.saveAll(p_orders);
    }

    public void removeOrder(int p_orderId) {
        if (orderRepository.existsById(p_orderId)) {
            orderRepository.deleteById(p_orderId);
        } else {
            throw new IllegalArgumentException("Order not found: ID " + p_orderId);
        }
    }

    @Transactional
    public Order updateOrder(Order p_order) {
        ValidationUtils.validateNonNull(p_order, "Order");

        Order existingOrder = orderRepository.findById(p_order.getOrderID())
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada ID: " + p_order.getOrderID()));

        if (p_order.getDestination() != null) {
            existingOrder.setDestination(p_order.getDestination());
        }
        if (p_order.getDeliveryDate() != null) {
            existingOrder.setDeliveryDate(p_order.getDeliveryDate());
        }

        return orderRepository.save(existingOrder);
    }
}