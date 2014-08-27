//
// CMatrixBlock.hpp
// ~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_CMATRIXBLOCK_HPP
#define EIGENJS_CMATRIXBLOCK_HPP

#include <v8.h>
#include <node.h>
#include <nan.h>

#include <boost/mpl/at.hpp>
#include <boost/mpl/int.hpp>

#include "base.hpp"
#include "definition.hpp"
#include "CMatrix.hpp"
#include "CMatrixBlock_fwd.hpp"
#include "CMatrixBlock/definitions.hpp"
#include "throw_error.hpp"

namespace EigenJS {

template <
  typename ScalarType
, typename ValueType
, const char* ClassName
>
class CMatrixBlock
  : public base<CMatrixBlock, ScalarType, ValueType, ClassName> {
 public:
  typedef base<
      ::EigenJS::CMatrixBlock, ScalarType, ValueType, ClassName> base_type;

  typedef ScalarType scalar_type;
  typedef ValueType value_type;

  typedef ::EigenJS::CMatrix<scalar_type> CMatrix;

 public:
  static void Init(v8::Handle<v8::Object> exports) {
    NanScope();

    v8::Local<v8::FunctionTemplate> tpl = NanNew<v8::FunctionTemplate>(New);
    NanAssignPersistent(base_type::function_template, tpl);
    tpl->SetClassName(NanNew(ClassName));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    EIGENJS_OBJECT_INITIALIZE(CMatrix, tpl)
    EIGENJS_OBJECT_INITIALIZE(CMatrixBlock, tpl)

    exports->Set(NanNew(ClassName), tpl->GetFunction());
    NanAssignPersistent(base_type::constructor, tpl->GetFunction());
  }

  NAN_INLINE value_type& operator*() { return block_; }
  NAN_INLINE const value_type& operator*() const { return block_; }
  NAN_INLINE value_type* operator->() { return &block_; }
  NAN_INLINE const value_type* operator->() const { return &block_; }

 protected:
  explicit CMatrixBlock(
      const typename base_type::pointer_type& value_ptr
    , const typename value_type::Index& startRow
    , const typename value_type::Index& startCol
    , const typename value_type::Index& blockRows
    , const typename value_type::Index& blockCols
  ) : base_type(value_ptr)
    , block_(
        base_type::value_ptr_->block(startRow, startCol, blockRows, blockCols)
      ) {}

  ~CMatrixBlock() {}

  static NAN_METHOD(New) {
    NanScope();

    if (args.Length() < 5) {
      NanThrowError(
          "Tried creating a complex block without "
          "Matrix, startRow, startCol, blockRows and blockCols arguments");
      NanReturnUndefined();
    }

    if (CMatrix::is_cmatrix(args[0]) &&
        args[1]->IsNumber() &&
        args[2]->IsNumber() &&
        args[3]->IsNumber() &&
        args[4]->IsNumber()
    ) {
      const CMatrix* const& rhs_obj =
          node::ObjectWrap::Unwrap<CMatrix>(args[0]->ToObject());
      const CMatrix& rhs_CMatrix = *rhs_obj;
      const typename CMatrix::value_type& rhs_cmatrix = *rhs_CMatrix;
      const typename value_type::Index& startRow = args[1]->Int32Value();
      const typename value_type::Index& startCol = args[2]->Int32Value();
      const typename value_type::Index& blockRows = args[3]->Int32Value();
      const typename value_type::Index& blockCols = args[4]->Int32Value();

      const typename value_type::Index&& rows = startRow + blockRows - 1;
      const typename value_type::Index&& cols = startCol + blockCols - 1;

      if (CMatrix::is_out_of_range(rhs_cmatrix, rows, cols)) {
        NanReturnUndefined();
      }

      if (startRow >= 0 && startCol >= 0 &&
          blockRows >= 0 && blockCols >= 0
      ) {
        if (args.IsConstructCall()) {
          CMatrixBlock* obj = new CMatrixBlock(
              rhs_CMatrix, startRow, startCol, blockRows, blockCols);
          obj->Wrap(args.This());
          NanReturnValue(args.This());
        } else {
          v8::Local<v8::Value> argv[] = {
              args[0], args[1], args[2], args[3], args[4] };
          NanReturnValue(
            base_type::new_instance(
              args
            , sizeof(argv) / sizeof(v8::Local<v8::Value>)
            , argv
            )
          );
        }
      }
    }

    EIGENJS_THROW_ERROR_INVALID_ARGUMENT()
    NanReturnUndefined();
  }

 private:
  value_type block_;
};

}  // namespace EigenJS

#endif  // EIGENJS_CMATRIXBLOCK_HPP
