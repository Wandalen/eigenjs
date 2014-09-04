//
// CMatrix/instance_method_inverse.hpp
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_CMATRIX_INSTANCE_METHOD_INVERSE_HPP
#define EIGENJS_CMATRIX_INSTANCE_METHOD_INVERSE_HPP

namespace EigenJS {

EIGENJS_INSTANCE_METHOD(CMatrix, inverse,
{
  const T* const& obj = node::ObjectWrap::Unwrap<T>(args.This());
  const typename T::value_type& value = **obj;
  v8::Local<v8::Value> argv[] = {
    NanNew<v8::Integer>(0) /* rows */
  , NanNew<v8::Integer>(0) /* cols */
  };

  NanScope();

  if (!T::is_square_matrix(obj)) {
    NanReturnUndefined();
  }

  v8::Local<v8::Object> instance = CMatrix::new_instance(
    args
  , sizeof(argv) / sizeof(v8::Local<v8::Value>)
  , argv
  );

  CMatrix* new_obj = node::ObjectWrap::Unwrap<CMatrix>(instance);
  typename CMatrix::value_type& new_cmatrix = **new_obj;

  new_cmatrix = value.inverse();

  NanReturnValue(instance);
})

}  // namespace EigenJS

#endif  // EIGENJS_CMATRIX_INSTANCE_METHOD_INVERSE_HPP
