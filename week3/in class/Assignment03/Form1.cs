using System.Drawing;

namespace Assignment03
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.Height = 500;
            this.Width = 520;
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            Pen myPen = new Pen(Color.Black);
            Brush myBrush = new SolidBrush(Color.Black);

            //Title Graphic  
            myBrush = new SolidBrush(Color.IndianRed);

            g.FillPolygon(myBrush, DrawHexagon(250, 75, 100));
            g.FillPie(myBrush, 270, 75, 50, 50, 30, 90);
            g.FillPie(myBrush, 180, 75, 50, 50, 60, 90);

            myBrush = new SolidBrush(Color.LightGoldenrodYellow);
            g.FillEllipse(myBrush, 100, 160, 300, 300);

            myBrush = new SolidBrush(Color.Black);
            Font titleStyle = new Font("Courier New", 16);
            g.DrawString("UFO", titleStyle, myBrush, new PointF(228f, 50f));
            g.DrawString("Game", titleStyle, myBrush, new PointF(220f, 70f));

            //UFO Beam
            Point[] triangle = new Point[] { new Point(238, 225), new Point(200, 450), new Point(300, 450) };

            myBrush = new SolidBrush(Color.GreenYellow);
            g.FillPolygon(myBrush, triangle);
            g.DrawPolygon(myPen, triangle);

            //UFO Top
            myBrush = new SolidBrush(Color.Black);
            g.FillEllipse(myBrush, 212, 175, 48, 60);
            myPen.Width = 3;
            g.DrawArc(myPen, 210, 170, 52, 62, 180, 180);

            //UFO Bottom
            myBrush = new SolidBrush(Color.Silver);
            g.FillEllipse(myBrush, 175, 200, 126, 32);
            g.DrawEllipse(myPen, 175, 200, 126, 32);
            myPen.Width = 1;

            //Side Border
            myBrush = new SolidBrush(Color.RosyBrown);
            int borderHeight = 0;
            while (borderHeight < 500)
            {
                g.FillRectangle(myBrush, 5, borderHeight, 25, 25);
                g.FillRectangle(myBrush, 475, borderHeight, 25, 25);
                g.DrawRectangle(myPen, 5, borderHeight, 25, 25);
                g.DrawRectangle(myPen, 475, borderHeight, 25, 25);
                borderHeight += 25;
            }

            //Start Button
            myBrush = new SolidBrush(Color.Silver);
            Rectangle startBox = new Rectangle(210, 400, 75, 25);
            g.FillRectangle(myBrush, startBox);
            g.DrawRectangle(myPen, startBox);

            myBrush = new SolidBrush(Color.Black);
            g.DrawString("Start", titleStyle, myBrush, startBox);

        }

        private PointF[] DrawHexagon(int x, int y, int width)
        {
            int sideLength = width / 2;
            
            //first point can just be the the center point translated over to the right the length of the radius of the hexagon
            PointF firstPoint = new PointF(x + sideLength, y);

            var shape = new PointF[6];
            var shape2 = new PointF[6];

            shape[0] = firstPoint;

            //a perfect hexagon has a new point every 60 degrees.
            //just have to rotate the first point around the center 60 degrees * the number of point (i.e. the 2nd point is 60degrees from the first, and the 4ths is 240 degrees from the first)
            for (int i = 1; i < 6; i++)
            {
                shape[i] = rotatePoint(x, y, 60 * i, firstPoint);
            }

            return shape;
        }

        private PointF rotatePoint(float cx, float cy, float angle, PointF p)
        {
            //Math from my linear algebra notes from a couple semesters ago
            //Tranlastion to point, apply roation, translate back to point

            float[,] TranslationToOrigin =
            {
                {1,0,cx },
                {0,1,cy },
                {0,0,1 }
            };

            float[,] Rotation =
            {
                {(float)Math.Cos(angle*Math.PI/180),-(float)Math.Sin(angle * Math.PI/180),0 },
                {(float)Math.Sin(angle * Math.PI/180),(float)Math.Cos(angle*Math.PI/180),0 },
                {0,0,1 }
            };

            float[,] TranslationBack =
            {
                {1,0,-cx },
                {0,1,-cy },
                {0,0,1 }
            };

            float[,] Point =
            {
                {1,0,p.X },
                {0,1,p.Y },
                {0,0,1 }
            };

            float[,] TranslationMatrix = MultiplyMatrix(MultiplyMatrix(TranslationToOrigin, Rotation), TranslationBack);

            var result = MultiplyMatrix(TranslationMatrix, Point);

            return new PointF(result[0, 2], result[1, 2]);
        }

        //Matrix multiplication code from https://stackoverflow.com/questions/6311309/how-can-i-multiply-two-matrices-in-c
        public float[,] MultiplyMatrix(float[,] A, float[,] B)
        {
            int rA = A.GetLength(0);
            int cA = A.GetLength(1);
            int rB = B.GetLength(0);
            int cB = B.GetLength(1);

            float temp = 0;
            float[,] output = new float[rA, cB];

            for (int i = 0; i < rA; i++)
            {
                for (int j = 0; j < cB; j++)
                {
                    temp = 0;
                    for (int k = 0; k < cA; k++)
                    {
                        temp += A[i, k] * B[k, j];
                    }
                    output[i, j] = temp;
                }
            }

            return output;
        }
    }
}