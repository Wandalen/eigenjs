//
// FullPivLU/instance_method_kernel.hpp
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_FULLPIVLU_INSTANCE_METHOD_KERNEL_HPP
#define EIGENJS_FULLPIVLU_INSTANCE_METHOD_KERNEL_HPP

namespace EigenJS {

EIGENJS_INSTANCE_METHOD(FullPivLU, kernel,
{
  const T* const& obj = node::ObjectWrap::Unwrap<T>(args.This());
  const typename T::value_type& value = **obj;
  v8::Local<v8::Value> argv[] = {
    NanNew<v8::Integer>(0)  /* rows */
  , NanNew<v8::Integer>(0)  /* cols */
  };

  NanScope();

  v8::Local<v8::Object> instance = Matrix::new_instance(
    args
  , sizeof(argv) / sizeof(v8::Local<v8::Value>)
  , argv
  );

  Matrix* new_obj = node::ObjectWrap::Unwrap<Matrix>(instance);
  typename Matrix::value_type& new_matrix = **new_obj;

  new_matrix = value.kernel();

  NanReturnValue(instance);
})

}  // namespace EigenJS

#endif  // EIGENJS_FULLPIVLU_INSTANCE_METHOD_KERNEL_HPP
