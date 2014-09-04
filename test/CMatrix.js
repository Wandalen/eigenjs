const
    Eigen = require('../index.js'),
    Complex = Eigen.Complex,
    Matrix = Eigen.Matrix,
    Vector = Eigen.Vector,
    CMatrix = Eigen.CMatrix,
    CVector = Eigen.CVector,
    CMatrixBlock = Eigen.CMatrixBlock,
    should = require('should');

describe('CMatrix', function() {
  var mat;

  it('#CMatrix() should be a function', function() {
    CMatrix.should.be.a.Function;
  });

  it('should throw error when tried creating a complex matrix without rows and columns arguments', function() {
    (function() { new CMatrix(); }).should.throw('Tried creating a complex matrix without rows and columns arguments');
    (function() { new CMatrix(1); }).should.throw('Tried creating a complex matrix without rows and columns arguments');
    (function() { new CMatrix(1, 2); }).should.not.throw();
  });

  it('should be invoked with arguments rows and columns and return an object', function() {
    CMatrix(1,2).should.be.an.Object;
    (new CMatrix(3, 4)).should.be.an.Object;
  });

  it('#CMatrix(3, 2) should return the complex matrix of size 3x2', function() {
    cmat = CMatrix(3, 2);
    cmat.rows().should.equal(3);
    cmat.cols().should.equal(2);
  });

  beforeEach(function() {
    cmat = CMatrix(3, 3)
      .set(0, 0, Complex(1, 1))
      .set(0, 1, Complex(2, 2))
      .set(0, 2, Complex(3, 3))
      .set(1, 0, Complex(4, 4))
      .set(1, 1, Complex(5, 5))
      .set(1, 2, Complex(6, 6))
      .set(2, 0, Complex(7, 7))
      .set(2, 1, Complex(8, 8))
      .set(2, 2, Complex(9, 9));
  });

  it('#set() should throw message when row or column numbers are out of range', function() {
    cmat.set.should.be.a.Function;

    (function() {
      cmat.set(3, 0, 68);
    }).should.throw('Row or column numbers are out of range');
    (function() {
      cmat.set(-1, -2, 500);
    }).should.throw('Row or column numbers are out of range');
  });

  it('#set() with array argument should work ok', function() {
    cmat.set.should.be.a.Function;

    CMatrix(3, 3).set([
      Complex(1, 1), Complex(2, 2), Complex(3, 3),
      Complex(4, 4), Complex(5, 5), Complex(6, 6),
      Complex(7, 7), Complex(8, 8), Complex(9, 9)
    ]).toString().should.eql(cmat.toString());

    (function() {
      CMatrix(3, 3).set([
      Complex(1, 1), Complex(2, 2), Complex(3, 3),
      Complex(4, 4), Complex(5, 5), Complex(6, 6)
      ]);
    }).should.throw('Too few coefficients');

    (function() {
      CMatrix(3, 3).set([
      Complex( 1,  1), Complex( 2,  2), Complex( 3,  3),
      Complex( 4,  4), Complex( 5,  5), Complex( 6,  6),
      Complex( 7,  7), Complex( 8,  8), Complex( 9,  9),
      Complex(10, 10), Complex(11, 11), Complex(12, 12)
      ]);
    }).should.throw('Too many coefficients');
  });

  it('#equals() should return true if two complex matrices are equal', function() {
    cmat.equals.should.be.a.Function;

    cmat.equals(cmat).should.ok;
    cmat.equals(new CMatrix(3, 3)
    .set([
      Complex(1, 1), Complex(2, 2), Complex(3, 3),
      Complex(4, 4), Complex(5, 5), Complex(6, 6),
      Complex(7, 7), Complex(8, 8), Complex(9, 9)
    ])).should.ok;

    (function() {
      cmat.equals(new CMatrix(1, 1).set([68]));
    }).should.throw("Nonconformant arguments");
  });

  it('#equals() should return true if a complex matrix and a complex vector are equal', function() {
    cmat.equals.should.be.a.Function;

    var cmat2 = new CMatrix(3, 1).set([
      1,
      2,
      3
    ]);

    cmat2.equals(
      CVector([
        1,
        2,
        3
      ])
    ).should.ok;
  });

  it('#get() should return the element value of CMatrix', function() {
    cmat.get.should.be.a.Function;

    cmat.get(0, 0).equals(Complex(1, 1)).should.ok;
    cmat.get(0, 1).equals(Complex(2, 2)).should.ok;
    cmat.get(0, 2).equals(Complex(3, 3)).should.ok;
    cmat.get(1, 0).equals(Complex(4, 4)).should.ok;
    cmat.get(1, 1).equals(Complex(5, 5)).should.ok;
    cmat.get(1, 2).equals(Complex(6, 6)).should.ok;
    cmat.get(2, 0).equals(Complex(7, 7)).should.ok;
    cmat.get(2, 1).equals(Complex(8, 8)).should.ok;
    cmat.get(2, 2).equals(Complex(9, 9)).should.ok;
    (function(){
      cmat.get(3, 0);
    }).should.throw('Row or column numbers are out of range');
  });

  it('#toString() should return all element values of CMatrix', function() {
    cmat.toString.should.be.a.Function;

    cmat.toString().should.equal("(1,1) (2,2) (3,3)\n(4,4) (5,5) (6,6)\n(7,7) (8,8) (9,9)");
  });

  it('#add() should return the sum of two complex matrices', function() {
    cmat.add.should.be.a.Function;

    CMatrix(3, 3).set([
       2,  4,  6,
       8,  9, 10,
      11, 12, 13
    ]).add(cmat).toString().should.equal(" (3,1)  (6,2)  (9,3)\n(12,4) (14,5) (16,6)\n(18,7) (20,8) (22,9)");

    (function() {
      CMatrix(2, 3).set([
        1, 0, 0,
        0, 1, 0
      ]).add(cmat);
    }).should.throw("Nonconformant arguments");

  });

  it('#add() should return the sum of a complex matrix and a matrix', function() {
    cmat.add.should.be.a.Function;

    var mat = Matrix(3, 3).set([
       2,  4,  6,
       8,  9, 10,
      11, 12, 13
    ]);

    cmat.add(mat).toString().should.equal(" (3,1)  (6,2)  (9,3)\n(12,4) (14,5) (16,6)\n(18,7) (20,8) (22,9)");

    (function() {
      cmat.add(
        Matrix(2, 3).set([
          1, 0, 0,
          0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#adda() should return the sum of two complex matrices and saves it back', function() {
    cmat.adda.should.be.a.Function;

    cmat.adda(
      CMatrix(3, 3)
      .set([
        Complex( 2, 0), Complex( 4, 0), Complex( 6, 0),
        Complex( 8, 0), Complex( 9, 0), Complex(10, 0),
        Complex(11, 0), Complex(12, 0), Complex(13, 0)
      ])
    );
    cmat.toString().should.equal(" (3,1)  (6,2)  (9,3)\n(12,4) (14,5) (16,6)\n(18,7) (20,8) (22,9)");

    (function() {
      cmat.adda(
        CMatrix(2, 3)
        .set([
          1, 0, 0,
          0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#adda() should return the sum of a complex matrix and a matrix then saves it back', function() {
    cmat.adda.should.be.a.Function;

    var mat = Matrix(3, 3).set([
       1,  3,  5,
       7,  9, 11,
      13, 15, 17
    ]);
    cmat.adda(mat).toString().should.equal(" (2,1)  (5,2)  (8,3)\n(11,4) (14,5) (17,6)\n(20,7) (23,8) (26,9)");

    (function() {
      cmat.adda(
        CMatrix(2, 3).set([
          1, 0, 0,
          0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#sub() should return the difference of two complex matrices', function() {
    cmat.sub.should.be.a.Function;

    CMatrix(3, 3).set([
       2,  4,  6,
       8,  9, 10,
      11, 12, 13
    ]).sub(cmat).toString().should.equal("(1,-1) (2,-2) (3,-3)\n(4,-4) (4,-5) (4,-6)\n(4,-7) (4,-8) (4,-9)");

    (function() {
      CMatrix(2, 3).set([
        1, 0, 0,
        0, 1, 0
      ]).sub(cmat);
    }).should.throw("Nonconformant arguments");

  });

  it('#sub() should return the difference of a complec matrix and a matrix', function() {
    cmat.sub.should.be.a.Function;

    var mat = Matrix(3, 3).set([
       1,  3,  5,
       7,  9, 11,
      13, 15, 17
    ]);
    cmat.sub(mat).toString().should.equal(" (0,1) (-1,2) (-2,3)\n(-3,4) (-4,5) (-5,6)\n(-6,7) (-7,8) (-8,9)");

    (function() {
      cmat.sub(
        CMatrix(2, 3).set([
        1, 0, 0,
        0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#suba() should return the difference of two complex matrices and saves it back', function() {
    cmat.suba.should.be.a.Function;

    var cmat2 = CMatrix(3, 3)
    .set([
       1,  3,  5,
       7,  9, 11,
      13, 15, 17
    ]);
    cmat.suba(cmat2);
    cmat.toString().should.equal(" (0,1) (-1,2) (-2,3)\n(-3,4) (-4,5) (-5,6)\n(-6,7) (-7,8) (-8,9)");

    (function() {
      cmat.suba(
        CMatrix(2, 3)
        .set([
          1, 0, 0,
          0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#suba() should return the difference of a complex matrix and a matrix then saves it back', function() {
    cmat.suba.should.be.a.Function;

    var mat = Matrix(3, 3)
    .set([
       1,  3,  5,
       7,  9, 11,
      13, 15, 17
    ]);
    cmat.suba(mat);
    cmat.toString().should.equal(" (0,1) (-1,2) (-2,3)\n(-3,4) (-4,5) (-5,6)\n(-6,7) (-7,8) (-8,9)");

    (function() {
      cmat.suba(
        Matrix(2, 3)
        .set([
          1, 0, 0,
          0, 1, 0
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#mul() should return the product of two complex matrices', function() {
    cmat.mul.should.be.a.Function;

    var cvector = new CMatrix(3, 1).set([Complex(1, 1), Complex(2, 2), Complex(3, 3)]);
    cmat.mul(cvector).toString().should.equal(" (0,28)\n (0,64)\n(0,100)");

    (function() {
      cvector.mul(cmat);
    }).should.throw("Invalid matrix product");
  });

  it('#mul() should return the product of a complex matrix and a matrix', function() {
    cmat.mul.should.be.a.Function;

    var vector = new Matrix(3, 1).set([1, 2, 3]);
    cmat.mul(vector).toString().should.equal("(14,14)\n(32,32)\n(50,50)");

    (function() {
      vector.mul(cmat);
    }).should.throw("Invalid matrix product");
  });

  it('#mul() should return the product of a complex matrix and a scalar value', function() {
    cmat.mul.should.be.a.Function;

    cmat.mul(-1).toString().should.equal("(-1,-1) (-2,-2) (-3,-3)\n(-4,-4) (-5,-5) (-6,-6)\n(-7,-7) (-8,-8) (-9,-9)");
  });

  it('#mul() should return the product of a complex matrix and a complex value', function() {
    cmat.mul.should.be.a.Function;

    cmat.mul(Complex(-1, -1)).toString().should.equal(" (0,-2)  (0,-4)  (0,-6)\n (0,-8) (0,-10) (0,-12)\n(0,-14) (0,-16) (0,-18)");
  });

  it('#mula() should return the product of two complex matrices and saves it back', function() {
    cmat.mula.should.be.a.Function;

    var cvector = new CMatrix(3, 1).set([1, 2, 3]);
    cmat.mula(cvector);
    cmat.toString().should.equal("(14,14)\n(32,32)\n(50,50)");

    (function() {
      cvector.mula(cmat);
    }).should.throw("Invalid matrix product");
  });

  it('#mula() should return the product of a complex matrix and a matrix then saves it back', function() {
    cmat.mula.should.be.a.Function;

    var vector = new Matrix(3, 1).set([1, 2, 3]);
    cmat.mula(vector);
    cmat.toString().should.equal("(14,14)\n(32,32)\n(50,50)");
  });

  it('#mula() should return the product of a complex matrix and a vector then saves it back', function() {
    cmat.mula.should.be.a.Function;

    var vec = new Vector([1, 2, 3]);
    cmat.mula(vec);
    cmat.toString().should.equal("(14,14)\n(32,32)\n(50,50)");
  });

  it('#mula() should return the product of a complex matrix and a scalar value then saves it back', function() {
    cmat.mula.should.be.a.Function;

    cmat.mula(-1);
    cmat.toString().should.equal("(-1,-1) (-2,-2) (-3,-3)\n(-4,-4) (-5,-5) (-6,-6)\n(-7,-7) (-8,-8) (-9,-9)");
  });

  it('#mula() should return the product of a complex matrix and a complex value then saves it back', function() {
    cmat.mula.should.be.a.Function;

    cmat.mula(Complex(-1, 0));
    cmat.toString().should.equal("(-1,-1) (-2,-2) (-3,-3)\n(-4,-4) (-5,-5) (-6,-6)\n(-7,-7) (-8,-8) (-9,-9)");
  });

  it('#div() should return a CMatrix which be divied by a scalar value', function() {
    cmat.div.should.be.a.Function;

    var cmat2 = cmat.div(0);

    for (var i = 0; i < cmat.rows(); ++i) {
      for (var j = 0; j < cmat.cols(); ++j) {
        isNaN(cmat2.get(i, j).real);
        isNaN(cmat2.get(i, j).imag);
      }
    }
    cmat2.equals(
      new CMatrix(3, 3)
      .set([
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN)
      ])
    ).should.false;
    (NaN !== NaN).should.true;
    
    cmat.div(2).toString().should.equal("(0.5,0.5)     (1,1) (1.5,1.5)\n    (2,2) (2.5,2.5)     (3,3)\n(3.5,3.5)     (4,4) (4.5,4.5)");
  });

  it('#div() should return a CMatrix which be divied by a complex value', function() {
    cmat.div.should.be.a.Function;

    var cmat2 = cmat.div(Complex(0, 0));

    for (var i = 0; i < cmat.rows(); ++i) {
      for (var j = 0; j < cmat.cols(); ++j) {
        isNaN(cmat2.get(i, j).real);
        isNaN(cmat2.get(i, j).imag);
      }
    }
    cmat2.equals(
      new CMatrix(3, 3)
      .set([
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN)
      ])
    ).should.false;
    (NaN !== NaN).should.true;
    
    cmat.div(Complex(2, 0)).toString().should.equal("(0.5,0.5)     (1,1) (1.5,1.5)\n    (2,2) (2.5,2.5)     (3,3)\n(3.5,3.5)     (4,4) (4.5,4.5)");
  });

  it('#diva() should return a CMatrix which be divied by a scalar value and saves it back', function() {
    cmat.diva.should.be.a.Function;

    cmat.diva(Complex(2, 0));
    cmat.toString().should.equal("(0.5,0.5)     (1,1) (1.5,1.5)\n    (2,2) (2.5,2.5)     (3,3)\n(3.5,3.5)     (4,4) (4.5,4.5)");

    cmat.diva(0);
    for (var i = 0; i < cmat.rows(); ++i) {
      for (var j = 0; j < cmat.cols(); ++j) {
        isNaN(cmat.get(i, j).real);
        isNaN(cmat.get(i, j).imag);
      }
    }
    cmat.equals(
      new CMatrix(3, 3)
      .set([
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN), 
        Complex(NaN, NaN), Complex(NaN, NaN), Complex(NaN, NaN)
      ])
    ).should.false;
    (NaN !== NaN).should.true;
  });

  it('#transpose() should return the transpose of a complex matrix', function() {
    cmat.transpose.should.be.a.Function;

    cmat.toString().should.equal("(1,1) (2,2) (3,3)\n(4,4) (5,5) (6,6)\n(7,7) (8,8) (9,9)");

    var cmat2 = cmat.transpose();
    cmat2.should.instanceOf(CMatrix);
    cmat2.toString().should.equal("(1,1) (4,4) (7,7)\n(2,2) (5,5) (8,8)\n(3,3) (6,6) (9,9)");
  });

  it('#determinant() should return the determinant of a complex matrix', function() {
    cmat.determinant.should.be.a.Function;

    var result = cmat.determinant();
    result.should.instanceOf(Complex);
    result.abs().should.approximately(0, 1e-12);

    CMatrix.Identity(2).determinant().equals(Complex(1)).should.true;

    CMatrix(2, 2).set([
      1, 2,
      3, 4
    ]).determinant().equals(Complex(-2)).should.true;

    (function() {
      CMatrix(3, 2).determinant();
    }).should.throw("The matrix must be square");
  });

  it('#inverse() should return the inverse of a complex matrix', function() {
    cmat.inverse.should.be.a.Function;

    var cmat2 = new CMatrix(3, 3).set([
      1, 2, 3,
      0, 1, 4,
      5, 6, 0
    ]);

    var cmat3 = cmat2.inverse();
    cmat3.should.instanceOf(CMatrix);
    cmat3.toString().should.equal("(-24,0)  (18,0)   (5,0)\n (20,0) (-15,0)  (-4,0)\n(-5,-0)   (4,0)   (1,0)");

    cmat2.mul(cmat3).isApprox(CMatrix.Identity(3)).should.be.true;

    (function() {
      CMatrix(3, 2).inverse();
    }).should.throw("The matrix must be square");
  });

  it('#isApprox() should return true if this is approximately equal to other', function() {
    cmat.isApprox.should.be.a.Function;

    var cmat2 = new CMatrix(3, 3).set([
      Complex(0.111, 0.111), Complex(0.222, 0.222), Complex(0.333, 0.333),
      Complex(0.444, 0.444), Complex(0.555, 0.555), Complex(0.666, 0.666),
      Complex(0.777, 0.777), Complex(0.888, 0.888), Complex(0.999, 0.999)
    ]);
    cmat.div(9).isApprox(cmat2, 1e-3).should.false;
    cmat.div(9).isApprox(cmat2, 1e-2).should.true;

    (function() {
      cmat.isApprox(
        new CMatrix(1, 1).set([
          1
        ])
      );
    }).should.throw("Nonconformant arguments");

    (function() {
      CMatrix(3, 2).determinant();
    }).should.throw("The matrix must be square");
  });

  it('#isApprox() should return true if this is approximately equal to a complex vector', function() {
    cmat.isApprox.should.be.a.Function;

    var cmat2 = new CMatrix(3, 1).set([
      Complex(1, 1),
      Complex(2, 2),
      Complex(3, 3)
    ]);
    var cvec = new CVector([
      Complex(0.111, 0.111),
      Complex(0.222, 0.222),
      Complex(0.333, 0.333)
    ]);
    cmat2.div(9).isApprox(cvec, 1e-3).should.false;
    cmat2.div(9).isApprox(cvec, 1e-2).should.true;

    (function() {
      cmat2.isApprox(
        new CVector([
          1
        ])
      );
    }).should.throw("Nonconformant arguments");
  });

  it('#isSquare() should return true if this is square', function() {
    cmat.isSquare.should.be.a.Function;

    cmat.isSquare().should.be.true;
    CMatrix(3, 4).isSquare().should.be.false;
  });

  it('#Zero() should return a zero complex matrix', function() {
    CMatrix.Zero.should.be.a.Function;

    CMatrix.Zero(3, 3).toString().should.equal("(0,0) (0,0) (0,0)\n(0,0) (0,0) (0,0)\n(0,0) (0,0) (0,0)");

    CMatrix.Zero(3, 4).equals(
      new CMatrix(3, 4).set([
        Complex(0, 0), Complex(0, 0), Complex(0, 0), Complex(0, 0),
        Complex(0, 0), Complex(0, 0), Complex(0, 0), Complex(0, 0),
        Complex(0, 0), Complex(0, 0), Complex(0, 0), Complex(0, 0)
      ])
    ).should.true;
  });

  it('#Identity() should return a identity complex matrix', function() {
    CMatrix.Identity.should.be.a.Function;

    CMatrix.Identity(0).toString().should.equal("");

    cmat = CMatrix.Identity(3);
    cmat.equals(new CMatrix(3, 3).set([
     Complex(1, 0), Complex(0, 0), Complex(0, 0),
     Complex(0, 0), Complex(1, 0), Complex(0, 0),
     Complex(0, 0), Complex(0, 0), Complex(1, 0)
    ])).should.true;

    cmat = CMatrix.Identity(3, 4);
    cmat.equals(new CMatrix(3, 4).set([
     Complex(1, 0), Complex(0, 0), Complex(0, 0), Complex(0, 0),
     Complex(0, 0), Complex(1, 0), Complex(0, 0), Complex(0, 0),
     Complex(0, 0), Complex(0, 0), Complex(1, 0), Complex(0, 0)
    ])).should.true;
  });

  it('#Random() should return a complex matrix with random complex values', function() {
    CMatrix.Random.should.be.a.Function;

    var cmat2 = CMatrix.Random(3);
    cmat2.rows().should.equal(3);
    cmat2.cols().should.equal(3);

    var cmat3 = CMatrix.Random(3, 4);
    cmat3.rows().should.equal(3);
    cmat3.cols().should.equal(4);
  });

  it("#block() should return a complex matrix block", function() {
    var cmblock = cmat.block(0, 0, 2, 2);
    cmblock.should.instanceOf(CMatrixBlock);
    cmblock.toString().should.equal("(1,1) (2,2)\n(4,4) (5,5)");

    cmblock.assign(CMatrix(2, 2).set([
      -1, -2,
      -3, -4
    ]));

    cmat.toString().should.equal("(-1,0) (-2,0)  (3,3)\n(-3,0) (-4,0)  (6,6)\n (7,7)  (8,8)  (9,9)");
  });

  it('#Constant() should return a CMatrix with constant values', function() {
    CMatrix.Constant.should.be.a.Function;

    var cmat2 = CMatrix.Constant(4, 4, 0.6);
    cmat2.should.instanceOf(CMatrix);
    cmat2.toString().should.equal("(0.6,0) (0.6,0) (0.6,0) (0.6,0)\n(0.6,0) (0.6,0) (0.6,0) (0.6,0)\n(0.6,0) (0.6,0) (0.6,0) (0.6,0)\n(0.6,0) (0.6,0) (0.6,0) (0.6,0)");
  });
});