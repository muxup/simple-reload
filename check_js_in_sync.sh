#!/bin/sh

# Copyright Muxup contributors.
# Distributed under the terms of the MIT license, see LICENSE for details.
# SPDX-License-Identifier: MIT

# Helper to check the JS in README.me is in sync with the JS in
# simple-reload.js.

from_js=$(mktemp)
sed -e '1,/^$/ d' simple-reload.js > "$from_js"
from_md=$(mktemp)
sed -n '/^<script/,/<\/script>/{//!p;}' README.md > "$from_md"
diff --color --label js --label md -u "$from_js" "$from_md"
ret=$?
rm "$from_js" "$from_md"
exit $ret
