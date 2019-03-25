<template>
  <div>
    <b-card>
      <h4 slot="header">Dashboard</h4>
      <b-card-body>

      </b-card-body>
    </b-card>
  
    <b-card>
      <h4 slot="header">Overview</h4>
      <b-card-body>

      </b-card-body>
    </b-card>
    <b-row>
      <b-col>
        <b-card header="Spend By Category">
            <b-card-body>
              <PieChart />
            </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="Trend By Category">
          <b-card-body>
            <TrendChart />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
