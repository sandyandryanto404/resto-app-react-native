<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }} | Invoice</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>

<body style="padding-top: 4% !important;">

    <div class="container">
        <div class="card">
            <div class="card-header">
                Invoice Date
                <strong>{{ $order->order_date }}</strong>
                <span class="float-right"> <strong>No Invoice :</strong> {{ $order->order_number }}</span>
            </div>
            <div class="card-body">
                <div class="row mb-4">
                    <div class="col-sm-6">
                        <h6 class="mb-3">Customer:</h6>
                        <div>
                            <strong>{{ $order->customer_name }}</strong>
                        </div>
                        <div>Phone : {{ $order->customer_phone }}</div>
                    </div>

                    <div class="col-sm-6">
                        <h6 class="mb-3">Casheir:</h6>
                        <div>
                            <strong>{{ $user->name }}</strong>
                        </div>
                        <div>Email: {{ $user->email }}</div>
                    </div>



                </div>

                <div class="table-responsive-sm">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th class="center">#</th>
                                <th>Menu Name</th>
                                <th class="right">Price</th>
                                <th class="center">Qty</th>
                                <th class="right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                           @foreach($carts as $index => $row)
                                <tr>
                                    <td>{{ (int) $index + 1 }}</td>
                                    <td>{{ $row->menu_name }}</td>
                                    <td>{{ number_format($row->price,0,',','.') }}</td>
                                    <td>{{ $row->qty }}</td>
                                    <td>{{ number_format($row->total,0,',','.') }}</td>
                                </tr>
                           @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-5 ml-auto">
                        <div class="mt-5">
                            
                        </div>
                    </div>

                    <div class="col-lg-4 col-sm-5 ml-auto">
                        <table class="table table-clear">
                            <tbody>
                                <tr>
                                    <td class="left">
                                        <strong>Sub Total</strong>
                                    </td>
                                    <td class="right">{{ number_format((float)$order->subtotal, 2, '.', '') }}</td>
                                </tr>
                                <tr>
                                    <td class="left">
                                        <strong>+ Tax ({{ $order->tax }} %)</strong>
                                    </td>
                                    <td class="right">{{ number_format((float)$total_tax, 2, '.', '') }}</td>
                                </tr>
                                <tr>
                                    <td class="left">
                                        <strong>- Discount ({{ $order->discount }} %)</strong>
                                    </td>
                                    <td class="right">{{  number_format((float)$total_disc, 2, '.', '') }}</td>
                                </tr>
                                <tr>
                                    <td class="left">
                                        <strong>Grand Total</strong>
                                    </td>
                                    <td class="right">
                                        <strong>{{  number_format((float)$order->grand_total, 2, '.', '') }}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>

            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>