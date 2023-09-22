namespace ShapeDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.Height = 500;
            this.Width = 500;
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            Pen myPen = new Pen(Color.Black);
            Brush myBrush = new SolidBrush(Color.Red);

            g.DrawLine(myPen, new Point(2,2), new Point(400,400));

            g.DrawRectangle(myPen, 0, 0, 250, 150);

            var rec = new Rectangle(10,10,50,50);
            g.DrawRectangle(myPen, rec);

            g.DrawEllipse(myPen, 0, 0, 200, 200);
            g.FillEllipse(myBrush, 0, 0, 130, 80);
            g.DrawArc(myPen, 0, 0, 100, 100, 90, 180);

            g.DrawArc(myPen, 0, 0, 200, 200, 45, 90);

            g.DrawArc(myPen, 0, 0, 200, 200, 90, 90);

            g.DrawPie(myPen, 100, 100, 100, 100, 0, 90);
            g.DrawPie(myPen, 150, 150, 100, 100, 45, 90);
            g.DrawPie(myPen, 200, 200, 100, 100, 90, 90);

            var rec2 = new Rectangle(0, 0, 50, 100);

            g.DrawRectangle(myPen, rec2);

            Font font = new Font("Arial", 16);
            g.DrawString("2D Shapes Demo", font, myBrush, new PointF(100.0F, 100.0F));

            List<Point> points = new List<Point>();
            points.Add(new Point(0, 0));
            points.Add(new Point(10, 150));
            points.Add(new Point(20, 250));
            points.Add(new Point(100, 300));
            points.Add(new Point(150, 400));

            g.DrawPolygon(myPen, points.ToArray());

        }
    }
}