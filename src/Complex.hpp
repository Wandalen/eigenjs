//
// EigenJS.cpp
// ~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_COMPLEX_HPP
#define EIGENJS_COMPLEX_HPP

#include <node.h>
#include <v8.h>

#include <nan.h>

#include <complex>
#include <sstream>

namespace EigenJS {

template <typename ValueType>
class Complex : public node::ObjectWrap {
  typedef ValueType element_type;
  typedef std::complex<element_type> complex_type;

 public:
  static void Init(v8::Handle<v8::Object> exports) {
    NanScope();

    v8::Local<v8::FunctionTemplate> tpl = NanNew<v8::FunctionTemplate>(New);
    tpl->SetClassName(NanNew("Complex"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    NanAssignPersistent(constructor, tpl->GetFunction());
    exports->Set(NanNew("Complex"), tpl->GetFunction());

    NanAssignPersistent(function_template, tpl);
  }

 private:
  Complex(const element_type& real, const element_type& imag)
    : complex_(real, imag)
  {}
  ~Complex() {}

  static NAN_METHOD(New) {
    NanScope();

    if (args.Length() < 2) {
      NanThrowError("Tried creating complex without real and imag arguments");
      NanReturnUndefined();
    }

    if (args.IsConstructCall()) {
      const element_type& real = args[0]->NumberValue();
      const element_type& imag = args[1]->NumberValue();
      Complex* obj = new Complex(real, imag);
      obj->Wrap(args.This());
      NanReturnValue(args.This());
    } else {
      v8::Local<v8::Function> ctr = NanNew(constructor);
      v8::Local<v8::Value> argv[] = {args[0], args[1]};
      NanReturnValue(
        ctr->NewInstance(
            sizeof(argv) / sizeof(v8::Local<v8::Value>)
          , argv
        )
      );
    }
  }

 private:
  static v8::Persistent<v8::FunctionTemplate> function_template;
  static v8::Persistent<v8::Function> constructor;

 private:
  complex_type complex_;
};

template<typename ValueType>
v8::Persistent<v8::FunctionTemplate> Complex<ValueType>::function_template;

template<typename ValueType>
v8::Persistent<v8::Function> Complex<ValueType>::constructor;

}  // namespace EigenJS

#endif  // EIGENJS_COMPLEX_HPP
