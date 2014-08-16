//
// CMatrix/instance_method_rows.hpp
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_CMATRIX_INSTANCE_METHOD_ROWS_HPP
#define EIGENJS_CMATRIX_INSTANCE_METHOD_ROWS_HPP

namespace EigenJS {

EIGENJS_INSTANCE_METHOD(CMatrix, rows,
{
  const CMatrix* const& obj = node::ObjectWrap::Unwrap<CMatrix>(args.This());
  const typename CMatrix::value_type& cmatrix = **obj;

  NanScope();
  NanReturnValue(NanNew<v8::Integer>(cmatrix.rows()));
})

}  // namespace EigenJS

#endif  // EIGENJS_CMATRIX_INSTANCE_METHOD_ROWS_HPP
