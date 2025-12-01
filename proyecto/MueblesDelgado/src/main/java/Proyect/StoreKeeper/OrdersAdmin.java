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

    @Transactional // Importante para operaciones de escritura complejas
    public Order addOrder(Order p_order) {
        ValidationUtils.validateNonNull(p_order, "Order");

        // LÓGICA CRÍTICA:
        // Aseguramos que cada mueble apunte a esta orden antes de guardar.
        // Si no hacemos esto, la columna 'order_id' en la tabla furniture quedará NULL.
        if (p_order.getOrderContent() != null && !p_order.getOrderContent().isEmpty()) {
            for (Furniture f : p_order.getOrderContent()) {
                f.setOrder(p_order);
            }
            // Opcional: Calcular tiempo automáticamente
            p_order.calculateAssemblyTime();
        }

        return orderRepository.save(p_order);
    }

    public void setOrders(List<Order> p_orders) {
        // Validar relaciones para la lista completa
        for(Order order : p_orders) {
            if(order.getOrderContent() != null) {
                for(Furniture f : order.getOrderContent()) {
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

        // Verificar existencia
        Order existingOrder = orderRepository.findById(p_order.getOrderID())
                .orElseThrow(() -> new IllegalArgumentException("Order not found: ID " + p_order.getOrderID()));

        // Asegurar relaciones antes de guardar la actualización
        if (p_order.getOrderContent() != null) {
            for (Furniture f : p_order.getOrderContent()) {
                f.setOrder(p_order);
            }
            p_order.calculateAssemblyTime();
        }

        return orderRepository.save(p_order);
    }
}