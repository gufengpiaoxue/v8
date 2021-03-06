// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --opt --allow-natives-syntax --turbo --no-always-opt

class A {
  constructor() { }
}
class B extends A {
  constructor(call_super) {
    super();
    if (call_super) {
      super();
    }
  }
}

test = new B(0);
test = new B(0);
%OptimizeFunctionOnNextCall(B);
test = new B(0);
assertOptimized(B);
// Check that hole checks are handled correctly in optimized code.
assertThrowsEquals(() => {new B(1)}, ReferenceError());
assertOptimized(B);
