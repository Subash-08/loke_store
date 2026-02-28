const ShippingLabelGenerator = require('./backend/utils/shippingLabelGenerator');

async function test() {
    try {
        const order = {
            orderNumber: 'ORD-20260228-P7Z4L',
            createdAt: new Date(),
            shippingAddress: {
                firstName: 'SUBASH',
                lastName: 'M',
                addressLine1: 'METTUR',
                city: 'SALEM',
                state: 'TAMIL NADU',
                pincode: '636401',
                phone: '9874256458'
            },
            isPaid: true,
            items: [
                { name: 'Math Learning Kit | Counting Peg Board for Kids | Number, Addition and Subtraction Game', quantity: 1 }
            ]
        };
        const user = { firstName: 'SUBASH', lastName: 'M' };

        const result = await ShippingLabelGenerator.generateLabel(order, user);
    } catch (e) {
        console.error('ERROR:', e.message);
        console.error(e.stack);
    }
}
test();
