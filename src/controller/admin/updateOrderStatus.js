import orderSchema from '../../model/orderSchema.js';

// Update order status (shippingStatus and/or totalStatus)
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { shippingStatus, totalStatus } = req.body;

  // Validate input
  const validShippingStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  const validTotalStatuses = ['Pending', 'Paid', 'Failed'];

  if (shippingStatus && !validShippingStatuses.includes(shippingStatus)) {
    return res.status(400).json({ message: 'Invalid shipping status value' });
  }

  if (totalStatus && !validTotalStatuses.includes(totalStatus)) {
    return res.status(400).json({ message: 'Invalid total status value' });
  }

  // Prepare update object
  const updateData = {};
  if (shippingStatus) updateData.shippingStatus = shippingStatus;
  if (totalStatus) updateData.totalStatus = totalStatus;

  // Find and update order
  const order = await orderSchema.findByIdAndUpdate(
    orderId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({
    message: 'Order status updated successfully',
    order,
  });
};

export { updateOrderStatus };